const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const config = require('./config.json');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

const rooms = new Map();

const fandomNameMap = new Map();
const roleCheckMap = new Map();
config.streamers.forEach(s => {
    fandomNameMap.set(s.fandom.id, s.fandom.name);
    s.fandom.tiers.forEach(tier => {
        roleCheckMap.set(tier.name, { isSuperFan: tier.isSuperFan, isYasik: tier.isYasik });
    });
});

function getUserRole(user) {
    if (!user || !user.fanTier) return 'fan';
    const tierInfo = roleCheckMap.get(user.fanTier);
    if (!tierInfo) return 'fan';
    if (tierInfo.isYasik) return 'yasik';
    if (tierInfo.isSuperFan) return 'superfan';
    return 'fan';
}

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
            if (socketInstance) socketInstance.leave(roomId);
        });
    }
    rooms.delete(roomId);
}

function mapToObject(map) {
    const obj = {};
    for (let [key, value] of map.entries()) {
        if (value instanceof Map) {
            obj[key] = mapToObject(value);
        } else {
            obj[key] = value;
        }
    }
    return obj;
}


io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id} from IP: ${socket.handshake.address}`);
  
  socket.emit('server config', config);

  socket.on('check room mode', (roomId) => {
    const room = rooms.get(roomId);
    if (room) socket.emit('room mode response', { mode: room.mode });
    else socket.emit('error message', '존재하지 않는 방입니다.');
  });

  socket.on('create room', (data) => {
    const { userData, mode } = data;
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
        mode: mode,
        guesses: new Map(), 
        finishedStreamers: [], 
        currentRound: 1 
    });
    socket.emit('room created', { roomId, users: getUsersInRoom(roomId), ownerId: socket.id, mode: mode, currentRound: 1 });
    console.log(`User ${userData.nickname} created room ${roomId} with mode: ${mode}`);
  });

  socket.on('join room', (data) => {
    const { roomId, userData } = data;
    const room = rooms.get(roomId);
    if (!room) return socket.emit('error message', '존재하지 않는 방입니다.');
    if (room.kickedIPs.has(socket.handshake.address)) return socket.emit('error message', '이 방에서 강퇴당하여 입장할 수 없습니다.');
    if (userData.role === 'streamer' && getUsersInRoom(roomId).some(u => u.streamerId === userData.streamerId)) {
        return socket.emit('error message', '이미 같은 스트리머가 방에 참여하고 있습니다.');
    }
    socket.join(roomId);
    socket.userData = { ...userData, id: socket.id };
    socket.roomId = roomId;
    room.users.set(socket.id, socket.userData);
    socket.emit('join success', { roomId, users: getUsersInRoom(roomId), ownerId: room.ownerId, mode: room.mode, currentRound: room.currentRound });
    socket.to(roomId).emit('user joined', { user: socket.userData, users: getUsersInRoom(roomId) });
    if (room.guesses.size > 0) {
        socket.emit('guesses updated', mapToObject(room.guesses));
    }
    console.log(`User ${userData.nickname} joined room ${roomId}`);
  });
  
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
              fanGroup: targetUser.fanGroup, fanTier: targetUser.fanTier
          });
      } else {
          io.to(socket.roomId).emit('guess result', { 
              success: false, 
              message: `❌ ${streamerName}님이 ${targetUser.nickname}님을 ${guessedFanGroupName}으로 추측했지만, 아니었습니다!` 
          });
      }
  });

  socket.on('guess role', (data) => {
    const { targetUser, guessedRole, guessedTierName } = data;
    const room = rooms.get(socket.roomId);
    if (!room || !targetUser || !socket.userData || socket.userData.role !== 'streamer') return;

    const streamerId = socket.userData.streamerId;

    if (!room.guesses.has(targetUser.id)) {
        room.guesses.set(targetUser.id, new Map());
    }
    
    const userGuesses = room.guesses.get(targetUser.id);
    userGuesses.set(streamerId, { guessedRole, guessedTierName });
    
    io.to(socket.roomId).emit('guesses updated', mapToObject(room.guesses));
  });

  socket.on('end round', () => {
    const room = rooms.get(socket.roomId);
    const user = socket.userData;
    if (!room || !user || user.role !== 'streamer') return;

    const allUsersInRoom = getUsersInRoom(socket.roomId);
    const streamersInRoom = allUsersInRoom.filter(u => u.role === 'streamer');
    
    streamersInRoom.forEach(streamer => {
        if (room.finishedStreamers.some(f => f.streamerId === streamer.streamerId)) {
            return;
        }

        const streamerConfig = config.streamers.find(s => s.id === streamer.streamerId);
        if (!streamerConfig) return;

        const myFandomId = streamerConfig.fandom.id;
        const myFans = allUsersInRoom.filter(u => u.role === 'fan' && u.fanGroup === myFandomId);
        
        let correctCount = 0;
        myFans.forEach(fan => {
            const fanGuesses = room.guesses.get(fan.id);
            if (fanGuesses && fanGuesses.has(streamer.streamerId)) {
                const guess = fanGuesses.get(streamer.streamerId);
                const actualRole = getUserRole(fan);
                if (guess.guessedRole === actualRole) {
                    correctCount++;
                }
            }
        });

        const resultMessage = `📢 [${room.currentRound} 라운드 결과] ${streamer.nickname}님이 자신의 팬 ${myFans.length}명 중 ${correctCount}명의 정체를 맞혔습니다!`;
        io.to(socket.roomId).emit('game message', { message: resultMessage, type: 'reveal', chatGroupId: streamer.streamerId });
        
        if (correctCount === myFans.length && myFans.length > 0) {
            // [수정] 축하 메시지에 공동 순위 로직 적용
            const tempFinished = [...room.finishedStreamers, { streamerId: streamer.streamerId, finishedInRound: room.currentRound }];
            tempFinished.sort((a, b) => a.finishedInRound - b.finishedInRound);
            
            let currentRank = 0;
            let lastRound = -1;
            let rankForMessage = 0;
            tempFinished.forEach((fin, index) => {
                if (fin.finishedInRound > lastRound) {
                    currentRank = index + 1;
                }
                if (fin.streamerId === streamer.streamerId) {
                    rankForMessage = currentRank;
                }
                lastRound = fin.finishedInRound;
            });
            
            room.finishedStreamers.push({ streamerId: streamer.streamerId, finishedInRound: room.currentRound });

            const celebrationMessage = `🎉 축하합니다! ${streamer.nickname}님이 ${room.currentRound}라운드에 모든 팬의 정체를 간파했습니다! (${rankForMessage}등) 🎉`;
            io.to(socket.roomId).emit('game message', { message: celebrationMessage, type: 'success', chatGroupId: streamer.streamerId });

            const revealedFanData = myFans.map(fan => ({
                ...fan,
                actualRole: getUserRole(fan)
            }));
            io.to(socket.roomId).emit('reveal fandom', { streamerId: streamer.streamerId, fans: revealedFanData });
        }
    });

    room.currentRound++;
    io.to(socket.roomId).emit('round advanced', room.currentRound);

    if (room.finishedStreamers.length === streamersInRoom.length && streamersInRoom.length > 0) {
        let rank = 0;
        let lastRound = -1;
        // 완료 라운드 기준으로 먼저 정렬
        room.finishedStreamers.sort((a, b) => a.finishedInRound - b.finishedInRound);

        const rankings = room.finishedStreamers.map((finishedData, index) => {
            if (finishedData.finishedInRound > lastRound) {
                rank = index + 1;
            }
            lastRound = finishedData.finishedInRound;
            const streamerUser = streamersInRoom.find(s => s.streamerId === finishedData.streamerId);
            return {
                rank: rank,
                name: streamerUser.nickname,
                id: finishedData.streamerId,
                finishedInRound: finishedData.finishedInRound
            };
        });

        const finalResults = {
            rankings: rankings,
            allUsers: allUsersInRoom.map(u => ({...u, actualRole: getUserRole(u)}))
        };
        io.to(socket.roomId).emit('game over', finalResults);
    }
  });


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
                const newOwner = Array.from(room.users.values()).find(user => user.role === 'streamer');
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

  socket.on('chat message', (data) => {
    const { message, chatGroupId } = data;
    const user = socket.userData;
    const room = rooms.get(socket.roomId);
    if (!user || !room || !message || !chatGroupId) return;

    const roomMode = room.mode;
    let canChat = false;

    if (roomMode === 'fakefan') {
        const streamerConfig = config.streamers.find(s => s.id === chatGroupId);
        if (!streamerConfig) return;

        if ((user.role === 'streamer' && user.streamerId === chatGroupId) || 
            (user.role === 'fan' && user.fanGroup === streamerConfig.fandom.id)) {
            canChat = true;
        }
    } else {
        canChat = true;
    }

    if (canChat) {
      io.to(socket.roomId).emit('chat message', { user: user, message: message, chatGroupId: chatGroupId });
    }
  });

  socket.on('request user list', () => {
    if (socket.roomId) {
        const room = rooms.get(socket.roomId);
        if (room) socket.emit('user list', { users: getUsersInRoom(socket.roomId), ownerId: room.ownerId });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});