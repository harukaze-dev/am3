// [수정] public/06.text-game/client.js
// '문장퍼즐게임' 클라이언트 로직

const socket = io('/text-game');

// --- 전역 변수 ---
let myRoomCode = '';
let myPlayerId = '';
let myProfileImageSrc = document.getElementById('lobby-profile-preview').src;
let currentGameState = null;
let colorShuffleInterval = null;

// --- DOM Elements ---
const lobbyContainer = document.getElementById('lobby-container');
const gameContainer = document.getElementById('game-container');
const playerNameInput = document.getElementById('player-name-input');
const playerListBoard = document.getElementById('player-list-board');
const startGameButton = document.getElementById('start-game-button');
const resetButton = document.getElementById('reset-round-button');
const textGridContainer = document.getElementById('text-grid-container');
const gameTitleText = document.getElementById('game-title-text');
const topBarInputContainer = document.getElementById('top-bar-input-container');

// --- 이벤트 리스너 통합 관리 ---
document.addEventListener('click', (event) => {
    const target = event.target;
    // 로비 관련
    if (target.id === 'lobby-profile-preview') document.getElementById('lobby-profile-input').click();
    if (target.id === 'create-room-btn') handleCreateRoom();
    if (target.id === 'join-room-btn') handleJoinRoom();
    // 공통 게임 관련
    if (target.id === 'copy-code-btn') handleCopyCode();
    
    if (!currentGameState) return;
    const me = currentGameState.players[myPlayerId];
    if (me?.isHost && target.id === 'start-game-button' && currentGameState.state === 'waiting') socket.emit('startGame', { roomCode: myRoomCode });
    if (me?.isHost && target.id === 'reset-round-button') socket.emit('resetRound', { roomCode: myRoomCode });

    // 상단 입력 폼 '완료' 버튼 클릭
    if (target.id === 'top-bar-submit-btn') {
        handleSubmitWord();
    }

    /*
     * ===================================================================
     *  [핵심 수정] 삭제되었던 플레이어 카드 내 버튼 이벤트 처리 로직 복원
     * ===================================================================
     */
    // '정답!' (버저) 버튼 클릭 처리
    if (target.classList.contains('buzz-in-btn')) {
        socket.emit('buzzIn', { roomCode: myRoomCode });
    }

    // '정답'/'오답' (판정) 버튼 클릭 처리
    if (target.classList.contains('judge-btn')) {
        const isCorrect = target.classList.contains('correct');
        socket.emit('judgeAnswer', { roomCode: myRoomCode, isCorrect });
    }
});

document.addEventListener('keydown', (event) => {
    if (!currentGameState) return;
    // 상단 입력 폼에서 엔터 키 입력
    if (event.key === 'Enter' && event.target.id === 'top-bar-input') {
        handleSubmitWord();
    }
});

// --- 공통/유틸리티 함수 ---
function handleSubmitWord() {
    const input = document.getElementById('top-bar-input');
    if (!input) return;
    const word = input.value.trim();
    if (word && word.length > 0 && word.length <= 16) {
        socket.emit('submitWord', { roomCode: myRoomCode, word: word });
    } else {
        showToast('1~16자 사이의 문장을 입력해주세요.', 'error');
    }
}

// --- 로비 관련 함수들 ---
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
socket.on('gameStarted', () => { showToast('게임이 시작되었습니다!', 'info'); });

socket.on('updateGameState', (gameState) => {
    if (!gameState) return;
    const oldState = currentGameState ? currentGameState.state : '';
    currentGameState = gameState;
    stopColorShuffleAnimation();
    renderTextGrid(gameState.currentWord, gameState.gridColors);
    if (gameState.state === 'playing_guessing') {
        startColorShuffleAnimation(gameState.gridColors);
    }
    if (oldState !== 'round_end' && gameState.state === 'round_end') {
        const winner = gameState.players[gameState.currentGuesserId];
        if (winner) showGamePopup(`${winner.name}가 정답을 맞추었습니다!`, winner.color);
    }
    renderGame(gameState);
});

function onRoomJoined({ roomCode }) {
    myRoomCode = roomCode;
    lobbyContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    document.body.classList.remove('in-lobby');
}

// --- 렌더링 및 애니메이션 함수 ---
function startColorShuffleAnimation(colors) {
    stopColorShuffleAnimation();
    const boxes = textGridContainer.children;
    if (boxes.length !== 16) return;
    colorShuffleInterval = setInterval(() => {
        const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
        for (let i = 0; i < 16; i++) {
            boxes[i].style.backgroundColor = shuffledColors[i];
        }
    }, 1000);
}

function stopColorShuffleAnimation() {
    if (colorShuffleInterval) {
        clearInterval(colorShuffleInterval);
        colorShuffleInterval = null;
    }
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

function renderGame(gameState) {
    const me = gameState.players[myPlayerId];
    if (!me) return;

    // 상단 바 렌더링
    const isMyTurnToInput = (gameState.state === 'playing_input' || gameState.state === 'round_end') && gameState.currentTurnPlayerId === myPlayerId;
    
    if (isMyTurnToInput) {
        gameTitleText.classList.add('hidden');
        topBarInputContainer.classList.remove('hidden');
        topBarInputContainer.innerHTML = `
            <label for="top-bar-input">문제 출제 :</label>
            <input type="text" id="top-bar-input" class="top-bar-input" placeholder="1~16자 문장 입력..." maxlength="16" autofocus>
            <button id="top-bar-submit-btn" class="top-bar-submit-btn">완료</button>
        `;
        document.getElementById('top-bar-input').focus();
    } else {
        gameTitleText.classList.remove('hidden');
        topBarInputContainer.classList.add('hidden');
        topBarInputContainer.innerHTML = '';
    }

    // 좌측 컨트롤 렌더링
    document.getElementById('player-count-display').textContent = `참가 인원: ${Object.keys(gameState.players).length} / ${gameState.maxPlayers}`;
    // 우측 컨트롤 렌더링
    startGameButton.classList.toggle('hidden', !me.isHost || gameState.state !== 'waiting');
    resetButton.classList.toggle('hidden', !me.isHost);
    // 플레이어 목록 렌더링
    renderPlayerList(Object.values(gameState.players), gameState);
}

function renderPlayerList(players, gameState) {
    playerListBoard.innerHTML = '';
    const sortedPlayers = [...players].sort((a, b) => b.cumulativeScore - a.cumulativeScore);
    
    sortedPlayers.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.dataset.playerId = player.id;
        card.style.borderColor = player.color;
        
        let actionAreaHtml = '';
        const isMyCard = player.id === myPlayerId;
        const isTurnPlayer = player.id === gameState.currentTurnPlayerId;
        const isSubmitter = player.id === gameState.currentWord?.submitterId;
        const amISubmitter = myPlayerId === gameState.currentWord?.submitterId;

        if (isTurnPlayer && (gameState.state === 'playing_input' || gameState.state === 'round_end')) card.classList.add('current-turn');
        if (gameState.state === 'playing_judging' && player.id === gameState.currentGuesserId) card.classList.add('guesser');
        if (gameState.incorrectGuessers.includes(player.id)) card.classList.add('incorrect');
        
        switch (gameState.state) {
            case 'playing_input':
            case 'round_end':
                if (isTurnPlayer) {
                    actionAreaHtml = `<div class="player-status-display">입력 중...</div>`;
                }
                break;
            case 'playing_guessing':
                if (isSubmitter) {
                     actionAreaHtml = `<div class="player-status-display submitted">출제 중</div>`;
                } else if (isMyCard && !gameState.incorrectGuessers.includes(myPlayerId)) {
                    const contrastColor = getContrastColor(player.color);
                    actionAreaHtml = `<button class="buzz-in-btn" style="background-color: ${player.color}; color: ${contrastColor};">정답!</button>`;
                }
                break;
            case 'playing_judging':
                 if (player.id === gameState.currentGuesserId) {
                    actionAreaHtml = `<div class="player-status-display guesser-text">정답 확인 중...</div>`;
                 } else if (amISubmitter && isSubmitter) {
                    actionAreaHtml = `<div class="judge-actions"><button class="judge-btn correct">정답</button><button class="judge-btn incorrect">오답</button></div>`;
                 }
                break;
        }
        const hostBadge = player.isHost ? '<span style="color: #FFC107; margin-left: 5px;">👑</span>' : '';
        card.innerHTML = `<div class="profile-section"><img src="${player.imageSrc}" class="profile-image-preview"></div><div class="content-section"><div class="player-info-text"><div class="player-name">${player.name}${hostBadge}</div></div><div class="player-action-area">${actionAreaHtml}</div><div class="player-score">🏆 ${player.cumulativeScore}</div></div>`;
        playerListBoard.appendChild(card);
    });
}

function renderTextGrid(wordData, gridColors) {
    textGridContainer.innerHTML = '';
    const shuffledChars = wordData ? wordData.shuffledGrid : [];
    const colors = gridColors || [];
    for (let i = 0; i < 16; i++) {
        const box = document.createElement('div');
        box.className = 'text-box';
        const bgColor = colors[i] || '#f0f0f0';
        box.style.backgroundColor = bgColor;
        const char = shuffledChars[i] || '';
        box.textContent = char;
        textGridContainer.appendChild(box);
    }
}

function showGamePopup(message, color = 'rgba(0, 0, 0, 0.8)') {
    const popup = document.getElementById('game-popup');
    if (!popup) return;
    popup.textContent = message;
    popup.style.backgroundColor = color;
    popup.style.color = getContrastColor(color);
    popup.classList.add('show');
    setTimeout(() => { popup.classList.remove('show'); }, 1500);
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