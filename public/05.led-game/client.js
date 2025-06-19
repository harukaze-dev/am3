const socket = io('/led-game');

let myRoomCode = '';
let myPlayerId = '';
let myProfileImageSrc = document.getElementById('lobby-profile-preview').src;
let currentGameState = null;
let shuffleInterval = null;
let answerRevealInterval = null;

// --- DOM Elements ---
const lobbyContainer = document.getElementById('lobby-container');
const gameContainer = document.getElementById('game-container');
const playerNameInput = document.getElementById('player-name-input');
const playerListBoard = document.getElementById('player-list-board');
const startGameButton = document.getElementById('start-game-button');
const resetButton = document.getElementById('reset-round-button');

// --- 이벤트 리스너 통합 ---
document.addEventListener('click', (event) => { const target = event.target; if (target.id === 'lobby-profile-preview') document.getElementById('lobby-profile-input').click(); if (target.id === 'create-room-btn') handleCreateRoom(); if (target.id === 'join-room-btn') handleJoinRoom(); if (target.id === 'copy-code-btn') handleCopyCode(); if (!currentGameState) return; const me = currentGameState.players[myPlayerId]; if (me?.isHost && target.id === 'start-game-button' && currentGameState.state === 'waiting') socket.emit('startGame', { roomCode: myRoomCode }); if (me?.isHost && target.id === 'reset-round-button') socket.emit('resetRound', { roomCode: myRoomCode }); });
playerListBoard.addEventListener('click', (event) => { if (!currentGameState) return; const target = event.target; if (target.classList.contains('turn-submit-btn')) { const input = document.getElementById('turn-input'); if (input && input.value.trim().length === 4) socket.emit('submitWord', { roomCode: myRoomCode, word: input.value }); else showToast('4글자 단어를 입력해주세요.', 'error'); } if (target.classList.contains('buzz-in-btn')) socket.emit('buzzIn', { roomCode: myRoomCode }); if (target.classList.contains('judge-btn')) { const isCorrect = target.classList.contains('correct'); socket.emit('judgeAnswer', { roomCode: myRoomCode, isCorrect }); } });
playerListBoard.addEventListener('keydown', (event) => { if (event.key === 'Enter' && event.target.id === 'turn-input') { const input = event.target; if (input && input.value.trim().length === 4) socket.emit('submitWord', { roomCode: myRoomCode, word: input.value }); else showToast('4글자 단어를 입력해주세요.', 'error'); } });

// --- 로비 로직 (변경 없음) ---
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

    stopAllAnimations();

    if (gameState.state === 'playing_guessing') {
        startShuffleAnimation(gameState.currentWord.chars);
    } 
    else if (gameState.state === 'round_end' || (oldState === 'round_end' && gameState.state === 'playing_input')) {
        if(oldState !== 'round_end' && gameState.state === 'round_end') {
            const winner = gameState.players[gameState.currentGuesserId];
            if(winner) showGamePopup(`${winner.name}가 정답을 맞추었습니다!`, winner.color);
        }
        startAnswerRevealAnimation(gameState.currentWord.chars);
    } else {
        renderLedGrid(null);
    }
    renderGame(gameState);
});

function onRoomJoined({ roomCode }) { myRoomCode = roomCode; lobbyContainer.classList.add('hidden'); gameContainer.classList.remove('hidden'); }

// --- 렌더링 및 유틸리티 함수 ---
function getContrastColor(hexColor) { if(!hexColor) return '#000000'; if (hexColor.startsWith('#')) hexColor = hexColor.slice(1); const r = parseInt(hexColor.substring(0, 2), 16); const g = parseInt(hexColor.substring(2, 4), 16); const b = parseInt(hexColor.substring(4, 6), 16); const brightness = (r * 299 + g * 587 + b * 114) / 1000; return brightness > 155 ? '#000000' : '#FFFFFF'; }

function renderGame(gameState) {
    const me = gameState.players[myPlayerId];
    if (!me) return;
    document.getElementById('player-count-display').textContent = `참가 인원: ${Object.keys(gameState.players).length} / ${gameState.maxPlayers}`;
    startGameButton.classList.toggle('hidden', !me.isHost || gameState.state !== 'waiting');
    resetButton.classList.toggle('hidden', !me.isHost);
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
                if (isTurnPlayer && isMyCard) actionAreaHtml = `<div class="turn-input-container"><input type="text" id="turn-input" class="turn-input" placeholder="4글자 단어 입력..." maxlength="4" autofocus><button class="turn-submit-btn">완료</button></div>`;
                else if(isTurnPlayer) actionAreaHtml = `<div class="player-status-display">입력 중...</div>`;
                break;
            case 'playing_guessing':
                if (isSubmitter) {
                     actionAreaHtml = `<div class="player-status-display submitted">출제 중</div>`;
                } else if (isMyCard && !gameState.incorrectGuessers.includes(myPlayerId)) {
                    const contrastColor = getContrastColor(player.color);
                    actionAreaHtml = `<button class="buzz-in-btn" style="background-color: ${player.color}; color: ${contrastColor};">정답!</button>`;
                }
                break;
            /*
             * ===================================================================
             *  [핵심 해결책] 판단 버튼 표시 로직 수정
             *  - 'amISubmitter' (내가 출제자인가?)와 'isSubmitter' (이 카드가 출제자의 카드인가?)
             *    두 조건을 모두 만족할 때만 버튼을 표시하도록 변경합니다.
             * ===================================================================
             */
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

function renderLedGrid(charDataArray, singleCharMode = false, charIndex = 0) {
    const boxes = document.querySelectorAll('.led-box');
    let dataToRender = [];
    if (charDataArray) {
        if (singleCharMode) {
            dataToRender = Array(4).fill(charDataArray[charIndex]);
        } else {
            dataToRender = [...charDataArray].sort(() => Math.random() - 0.5);
        }
    }
    boxes.forEach((box, i) => {
        if (dataToRender.length === 0 || !dataToRender[i]) { box.innerHTML = ''; return; }
        const { char, color } = dataToRender[i];
        box.innerHTML = `<span class="led-char" style="color: ${color}; text-shadow: 0 0 5px ${color}, 0 0 15px ${color};">${char}</span>`;
    });
}

function startShuffleAnimation(charDataArray) {
    stopAllAnimations();
    shuffleInterval = setInterval(() => {
        renderLedGrid(charDataArray, false);
        document.querySelectorAll('.led-box').forEach(box => { box.style.opacity = '0.8'; setTimeout(() => box.style.opacity = '1', 50); });
    }, 70);
}

function startAnswerRevealAnimation(charDataArray) {
    stopAllAnimations();
    if(!charDataArray) return;
    let charIndex = 0;
    renderLedGrid(charDataArray, true, charIndex);
    answerRevealInterval = setInterval(() => {
        charIndex = (charIndex + 1) % charDataArray.length;
        renderLedGrid(charDataArray, true, charIndex);
    }, 1000);
}

function stopAllAnimations() {
    if (shuffleInterval) clearInterval(shuffleInterval);
    if (answerRevealInterval) clearInterval(answerRevealInterval);
    shuffleInterval = null; answerRevealInterval = null;
}

function showGamePopup(message, color = 'rgba(0, 0, 0, 0.8)') {
    let popup = document.getElementById('game-popup');
    if (!popup) { popup = document.createElement('div'); popup.id = 'game-popup'; document.body.appendChild(popup); }
    popup.textContent = message;
    popup.style.backgroundColor = color;
    popup.style.color = getContrastColor(color);
    popup.classList.add('show');
    setTimeout(() => { popup.classList.remove('show'); }, 1500);
}

function showToast(message, type = 'info') { const toastContainer = document.getElementById('toast-container'); const toast = document.createElement('div'); toast.className = `toast ${type}`; toast.textContent = message; toastContainer.appendChild(toast); setTimeout(() => { toast.classList.add('fade-out'); setTimeout(() => toast.remove(), 3000); }, 3000); }