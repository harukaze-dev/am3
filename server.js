// server.js

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const config = require('./config.json'); // 설정 파일 불러오기

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

const rooms = new Map();

// --- 설정 기반 헬퍼 데이터 생성 ---
const fandomNameMap = new Map();
config.streamers.forEach(s => {
    fandomNameMap.set(s.fandom.id, s.fandom.name);
});

// --- 헬퍼 함수 ---

function getUsersInRoom(roomId) {
    const room = rooms.get(roomId);
    if (!room) return [];
    return Array.from(room.users.values());
}

function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function hasStreamer(roomId) {
    const users = getUsersInRoom(roomId);
    return users.some(user => user.role === 'streamer');
}

function closeRoom(roomId, reason) {
    const room = rooms.get(roomId);
    if (!room) return;

    console.log(`Closing room ${roomId}. Reason: ${reason}`);
    io.to(roomId).emit('room closed', reason);

    const socketsInRoom = io.sockets.adapter.rooms.get(roomId);
    if (socketsInRoom) {
        socketsInRoom.forEach(socketId => {
            const socketInstance = io.sockets.sockets.get(socketId);
            if (socketInstance) {
                socketInstance.leave(roomId);
            }
        });
    }
    rooms.delete(roomId);
}


io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id} from IP: ${socket.handshake.address}`);
  
  // 클라이언트에게 게임 설정 정보 전송
  socket.emit('server config', config);

  // 방 입장 전, 클라이언트가 모드를 확인할 수 있도록 응답
  socket.on('check room mode', (roomId) => {
    const room = rooms.get(roomId);
    if (room) {
        socket.emit('room mode response', { mode: room.mode });
    } else {
        socket.emit('error message', '존재하지 않는 방입니다.');
    }
  });

  // 방 만들기 (mode 추가)
  socket.on('create room', (data) => {
    const { userData, mode } = data; // 모드 정보 수신

    if (userData.role !== 'streamer') {
        return socket.emit('error message', '스트리머만 방을 만들 수 있습니다.');
    }
    const roomId = generateRoomId();
    socket.join(roomId);

    socket.userData = { ...userData, id: socket.id };
    socket.roomId = roomId;

    rooms.set(roomId, {
        users: new Map([[socket.id, socket.userData]]),
        ownerId: socket.id,
        kickedIPs: new Set(),
        mode: mode // 방의 게임 모드 저장
    });
    
    // 클라이언트에 mode 정보도 함께 전달
    socket.emit('room created', { roomId, users: getUsersInRoom(roomId), ownerId: socket.id, mode: mode });
    console.log(`User ${userData.nickname} created room ${roomId} with mode: ${mode}`);
  });

  // 코드로 방 들어가기 (mode 전달 추가)
  socket.on('join room', (data) => {
    const { roomId, userData } = data;
    const room = rooms.get(roomId);

    if (!room) {
        return socket.emit('error message', '존재하지 않는 방입니다.');
    }
    if (room.kickedIPs.has(socket.handshake.address)) {
        return socket.emit('error message', '이 방에서 강퇴당하여 입장할 수 없습니다.');
    }
    if (userData.role === 'streamer' && getUsersInRoom(roomId).some(u => u.streamerId === userData.streamerId)) {
        return socket.emit('error message', '이미 같은 스트리머가 방에 참여하고 있습니다.');
    }

    socket.join(roomId);
    socket.userData = { ...userData, id: socket.id };
    socket.roomId = roomId;
    room.users.set(socket.id, socket.userData);
    
    // 클라이언트에 mode 정보도 함께 전달
    socket.emit('join success', { roomId, users: getUsersInRoom(roomId), ownerId: room.ownerId, mode: room.mode });
    socket.to(roomId).emit('user joined', { user: socket.userData, users: getUsersInRoom(roomId) });
    console.log(`User ${userData.nickname} joined room ${roomId}`);
  });
  
  // "팬덤 맞추기" 이벤트 처리
  socket.on('guess fan group', (data) => {
      const { streamerName, targetUser, guessedGroup } = data;
      const room = rooms.get(socket.roomId);
      if (!room || !targetUser) return;

      const actualFanGroupName = fandomNameMap.get(targetUser.fanGroup) || '알 수 없는 팬덤';
      const guessedFanGroupName = fandomNameMap.get(guessedGroup) || '알 수 없는 팬덤';

      if (targetUser.fanGroup === guessedGroup) {
          io.to(socket.roomId).emit('guess result', { 
              success: true, 
              message: `🕵️‍♂️ ${streamerName}님이 ${targetUser.nickname}님의 팬덤(${actualFanGroupName})을 맞혔습니다!`,
              fanGroup: targetUser.fanGroup,
              fanTier: targetUser.fanTier
          });
      } else {
          io.to(socket.roomId).emit('guess result', { 
              success: false, 
              message: `❌ ${streamerName}님이 ${targetUser.nickname}님을 ${guessedFanGroupName}으로 추측했지만, 아니었습니다!` 
          });
      }
  });

  // 플레이어 강퇴
  socket.on('kick player', (targetUserId) => {
    const room = rooms.get(socket.roomId);
    if (!room || socket.id !== room.ownerId) return;
    
    const targetSocket = io.sockets.sockets.get(targetUserId);
    if (targetSocket && targetSocket.userData) {
        const targetUserData = targetSocket.userData;
        
        room.kickedIPs.add(targetSocket.handshake.address);

        targetSocket.emit('kicked', '방장에 의해 강퇴당했습니다.');
        
        targetSocket.leave(socket.roomId);
        room.users.delete(targetUserId);

        io.to(socket.roomId).emit('user left', { user: targetUserData, reason: '강퇴됨', users: getUsersInRoom(socket.roomId) });
        console.log(`User ${targetUserData.nickname} (IP: ${targetSocket.handshake.address}) was kicked.`);
    }
  });

  // 연결 종료 처리
  socket.on('disconnect', () => {
    if (socket.userData && socket.roomId) {
      const roomId = socket.roomId;
      const room = rooms.get(roomId);
      if (room) {
        const departingUser = socket.userData;
        room.users.delete(socket.id);

        console.log(`User ${departingUser.nickname} left room ${roomId}`);

        if (room.users.size > 0) {
            if (socket.id === room.ownerId) {
                const remainingUsers = Array.from(room.users.values());
                const newOwner = remainingUsers.find(user => user.role === 'streamer');
                
                if (newOwner) {
                    room.ownerId = newOwner.id;
                    io.to(roomId).emit('new host', { newOwner, users: getUsersInRoom(roomId) });
                    console.log(`Host left. New host is ${newOwner.nickname}`);
                }
            }

            if (!hasStreamer(roomId)) {
                closeRoom(roomId, '스트리머가 모두 퇴장하여 방이 종료됩니다.');
                return;
            }

            io.to(roomId).emit('user left', { user: departingUser, users: getUsersInRoom(roomId) });
        } else {
            rooms.delete(roomId);
            console.log(`Room ${roomId} is now empty and closed.`);
        }
      }
    }
    console.log(`A user disconnected: ${socket.id}`);
  });

  // 기존 채팅 및 "슈퍼팬 찾기" 게임 이벤트
  socket.on('chat message', (msg) => {
    if (socket.userData && socket.roomId) {
      io.to(socket.roomId).emit('chat message', { user: socket.userData, message: msg });
    }
  });
  
  socket.on('reveal identity', (userData) => {
    if (socket.roomId) {
        io.to(socket.roomId).emit('identity revealed', { 
            nickname: userData.nickname, 
            tier: userData.fanTier, 
            fanGroup: userData.fanGroup 
        });
    }
  });

  socket.on('request user list', () => {
    if (socket.roomId) {
        const room = rooms.get(socket.roomId);
        if (room) {
            socket.emit('user list', { users: getUsersInRoom(socket.roomId), ownerId: room.ownerId });
        }
    }
  });

  socket.on('guess identity', (data) => {
    if (socket.roomId) {
        const { streamerName, targetUser } = data;
        io.to(socket.roomId).emit('guess result', { 
            success: true, 
            message: `🕵️‍♂️ ${streamerName}님이 ${targetUser.nickname}님의 정체(${targetUser.fanTier})를 맞혔습니다!`,
            fanGroup: targetUser.fanGroup,
            fanTier: targetUser.fanTier
        });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});