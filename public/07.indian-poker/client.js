// [수정] public/07.indian-poker/client.js
// '양세찬게임' 클라이언트 로직

const socket = io('/indian-poker');

// --- 전역 변수 ---
let myRoomCode = '';
let myPlayerId = '';
let myProfileImageSrc = document.getElementById('lobby-profile-preview').src;
let currentGameState = null;
let editingStates = {}; // [추가] 플레이어별 주제어 수정 상태 관리 { playerId: boolean }

// --- DOM Elements ---
const lobbyContainer = document.getElementById('lobby-container');
const gameContainer = document.getElementById('game-container');
const playerNameInput = document.getElementById('player-name-input');
const playerListBoard = document.getElementById('player-list-board');
const hostControls = document.getElementById('host-controls');

// --- 이벤트 리스너 통합 관리 ---
document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.id === 'lobby-profile-preview') document.getElementById('lobby-profile-input').click();
    if (target.id === 'create-room-btn') handleCreateRoom();
    if (target.id === 'join-room-btn') handleJoinRoom();
    if (target.id === 'copy-code-btn') handleCopyCode();
    
    if (!currentGameState) return;
    
    // 방장 컨트롤 버튼
    if (target.id === 'start-game-btn') socket.emit('startGame', { roomCode: myRoomCode });
    if (target.id === 'start-main-round-btn') socket.emit('startMainRound', { roomCode: myRoomCode });
    if (target.id === 'reset-game-btn') socket.emit('resetGame', { roomCode: myRoomCode });
});

playerListBoard.addEventListener('click', (event) => {
    if (!currentGameState) return;
    const card = event.target.closest('.player-card');
    if (!card) return;

    const targetPlayerId = card.dataset.playerId;

    // '완료' 버튼 클릭
    if (event.target.classList.contains('submit-topic-btn')) {
        const input = card.querySelector('.topic-input');
        if (input && input.value.trim()) {
            editingStates[myPlayerId] = false; // 수정 상태 종료
            socket.emit('submitTopic', { roomCode: myRoomCode, topic: input.value.trim() });
        } else {
            showToast('주제어를 입력해주세요.', 'error');
        }
    }

    // '수정' 버튼 클릭
    if (event.target.classList.contains('edit-topic-btn')) {
        editingStates[myPlayerId] = true; // 수정 상태 시작
        renderPlayerList(currentGameState, currentGameState.players[myPlayerId]); // UI 즉시 갱신
    }

    // '취소' 버튼 클릭
    if (event.target.classList.contains('cancel-edit-btn')) {
        editingStates[myPlayerId] = false; // 수정 상태 종료
        renderPlayerList(currentGameState, currentGameState.players[myPlayerId]); // UI 즉시 갱신
    }

    // 방장이 플레이어 카드 클릭 (공개)
    if (card.classList.contains('host-clickable')) {
        socket.emit('clearPlayer', { roomCode: myRoomCode, targetPlayerId });
    }
});

// [추가] 엔터키로 주제어 제출
playerListBoard.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target.classList.contains('topic-input')) {
        event.preventDefault(); // 기본 동작 방지
        const input = event.target;
        if (input.value.trim()) {
            editingStates[myPlayerId] = false; // 수정 상태 종료
            socket.emit('submitTopic', { roomCode: myRoomCode, topic: input.value.trim() });
        } else {
            showToast('주제어를 입력해주세요.', 'error');
        }
    }
});


// --- 로비 관련 함수 ---
playerNameInput.addEventListener('input', () => { document.getElementById('room-actions').classList.toggle('hidden', !playerNameInput.value.trim()); });
document.getElementById('lobby-profile-input').addEventListener('change', (event) => { if (event.target.files[0]) { const reader = new FileReader(); reader.onload = (e) => { myProfileImageSrc = e.target.result; document.getElementById('lobby-profile-preview').src = myProfileImageSrc; }; reader.readAsDataURL(event.target.files[0]); }});
function handleCreateRoom() { const playerName = playerNameInput.value.trim(); if (!playerName) return showToast('이름을 입력하세요!', 'error'); socket.emit('createRoom', { playerName, profileImageSrc: myProfileImageSrc }); }
function handleJoinRoom() { const playerName = playerNameInput.value.trim(); const roomCode = document.getElementById('room-code-input').value.trim().toUpperCase(); if (!playerName || !roomCode) return showToast('이름과 초대 코드를 모두 입력하세요!', 'error'); socket.emit('joinRoom', { roomCode, playerName, profileImageSrc: myProfileImageSrc }); }
function handleCopyCode() { navigator.clipboard.writeText(myRoomCode).then(() => showToast('초대 코드가 복사되었습니다!')); }

// --- 소켓 이벤트 핸들러 ---
socket.on('connect', () => { myPlayerId = socket.id; });
socket.on('roomCreated', onRoomJoined);
socket.on('roomJoined', onRoomJoined);
socket.on('playerJoined', ({ playerName }) => showToast(`${playerName} 님이 입장했습니다.`, 'join'));
socket.on('playerLeft', ({ playerName }) => showToast(`${playerName} 님이 퇴장했습니다.`, 'leave'));
socket.on('error', ({ message }) => showToast(message, 'error'));
socket.on('newHost', ({ playerName }) => showToast(`${playerName} 님이 새로운 방장이 되었습니다.`, 'info'));
socket.on('gameStarted', () => showToast('주제어 제출 시간입니다!', 'info'));

socket.on('updateGameState', (gameState) => {
    if (!gameState) return;
    const isNewGame = !currentGameState || currentGameState.state === 'waiting' && gameState.state !== 'waiting';
    if(isNewGame) {
        editingStates = {}; // 새 게임 시작 시 수정 상태 초기화
    }
    currentGameState = gameState;
    renderGame(gameState);
});

function onRoomJoined({ roomCode }) {
    myRoomCode = roomCode;
    lobbyContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    document.body.classList.remove('in-lobby');
}

// --- 렌더링 함수 ---
function renderGame(gameState) {
    const me = gameState.players[myPlayerId];
    if (!me) return;

    document.getElementById('player-count-display').textContent = `참가 인원: ${Object.keys(gameState.players).length} / ${gameState.maxPlayers}`;
    renderHostControls(gameState, me);
    renderPlayerList(gameState, me);
}

function renderHostControls(gameState, me) {
    hostControls.innerHTML = '';
    if (!me.isHost) return;

    let buttonHtml = '';
    switch(gameState.state) {
        case 'waiting':
            if (Object.keys(gameState.players).length > 1) buttonHtml = `<button id="start-game-btn">게임 시작</button>`;
            break;
        case 'ready_to_start':
            buttonHtml = `<button id="start-main-round-btn">라운드 시작</button>`;
            break;
        case 'playing':
        case 'game_over':
            buttonHtml = `<button id="reset-game-btn">게임 초기화</button>`;
            break;
    }
    hostControls.innerHTML = buttonHtml;
}

function renderPlayerList(gameState, me) {
    playerListBoard.innerHTML = '';
    const sortedPlayers = Object.values(gameState.players).sort((a, b) => a.name.localeCompare(b.name));

    sortedPlayers.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.dataset.playerId = player.id;
        card.style.borderColor = player.color; // [추가] 카드 테두리 색상 적용

        const isMyCard = player.id === myPlayerId;
        const isCleared = gameState.clearedPlayers.includes(player.id);
        const hasSubmitted = !!gameState.submittedTopics[player.id];
        const isEditing = !!editingStates[player.id];

        let contentHtml = '';

        // 게임 상태에 따라 카드 내부 컨텐츠 결정
        switch(gameState.state) {
            case 'topic_submission':
                if (isMyCard) {
                    if (isEditing || !hasSubmitted) { // 수정중이거나 아직 제출 안했을 때
                        const currentTopic = gameState.submittedTopics[player.id] || '';
                        contentHtml = `
                            <div class="topic-interaction-area">
                                <input type="text" class="topic-input" value="${currentTopic}" placeholder="주제어 입력..." maxlength="10">
                                <div class="interaction-buttons">
                                    <button class="submit-topic-btn">완료</button>
                                    ${hasSubmitted ? '<button class="cancel-edit-btn">취소</button>' : ''}
                                </div>
                            </div>`;
                    } else { // 제출했고, 수정중이 아닐 때
                        contentHtml = `
                            <div class="submitted-topic-display">
                                <p>${gameState.submittedTopics[player.id]}</p>
                                <button class="edit-topic-btn">수정</button>
                            </div>`;
                    }
                } else {
                    contentHtml = `<div class="status-text">${hasSubmitted ? '주제어 제출 완료!' : '주제어 입력 대기중...'}</div>`;
                }
                break;

            case 'playing':
            case 'game_over':
            case 'ready_to_start':
                const topicToShow = isCleared ? gameState.submittedTopics[player.id] : gameState.assignedTopics[player.id];
                const topicClass = isMyCard && !isCleared ? 'topic-display-area hidden-topic' : 'topic-display-area';
                contentHtml = `<div class="${topicClass}">${topicToShow || '???'}</div>`;
                break;
            default:
                contentHtml = '';
                break;
        }

        if (me.isHost && gameState.state === 'playing' && !isCleared) card.classList.add('host-clickable');
        if (isCleared) {
            card.classList.add('cleared');
            card.style.backgroundColor = player.color;
            card.style.color = getContrastColor(player.color);
        }

        const hostBadge = player.isHost ? '👑' : '';
        card.innerHTML = `
            <div class="player-info">
                <img src="${player.imageSrc}" alt="${player.name}" class="profile-image-preview">
                <span class="player-name">${player.name} ${hostBadge}</span>
            </div>
            ${contentHtml}
        `;
        playerListBoard.appendChild(card);
    });
}

function getContrastColor(hexColor) { 
    if(!hexColor) return '#000000'; 
    if (hexColor.startsWith('#')) hexColor = hexColor.slice(1); 
    const r = parseInt(hexColor.substring(0, 2), 16); 
    const g = parseInt(hexColor.substring(2, 4), 16); 
    const b = parseInt(hexColor.substring(4, 6), 16); 
    const brightness = (r * 299 + g * 587 + b * 114) / 1000; 
    return brightness > 140 ? '#000000' : '#FFFFFF';
}

function showToast(message, type = 'info') { 
    const toastContainer = document.getElementById('toast-container'); 
    const toast = document.createElement('div'); 
    toast.className = `toast ${type}`; 
    toast.textContent = message; 
    toastContainer.appendChild(toast); 
    setTimeout(() => { 
        toast.classList.add('fade-out'); 
        setTimeout(() => toast.remove(), 500);
    }, 2500); 
}