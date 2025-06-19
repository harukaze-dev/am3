const socket = io('/grid-game');

let myRoomCode = '';
let myPlayerId = '';
let myProfileImageSrc = document.getElementById('lobby-profile-preview').src;
let currentGameState = null;
let isAnimating = false;

// --- DOM Elements ---
const lobbyContainer = document.getElementById('lobby-container');
const gameContainer = document.getElementById('game-container');
const playerNameInput = document.getElementById('player-name-input');
const mainGameArea = document.getElementById('main-game-area');
const playerListBoard = document.getElementById('player-list-board');
const gridContainer = document.querySelector('.grid-container');
const triggerBox = document.getElementById('box-r3c2');
const turnIndicatorPopup = document.getElementById('turn-indicator-popup');
const hostControls = document.getElementById('host-controls');
const gameModeSelector = document.getElementById('game-mode-selector');
const switchBox = gameModeSelector.querySelector('.mode-switch-box');
const resetButton = document.getElementById('reset-round-button');

// --- 이벤트 리스너 통합 ---
document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.id === 'lobby-profile-preview') document.getElementById('lobby-profile-input').click();
    if (target.id === 'create-room-btn') handleCreateRoom();
    if (target.id === 'join-room-btn') handleJoinRoom();
    if (target.id === 'copy-code-btn') handleCopyCode();
    if (target.id === 'reset-round-button' && currentGameState?.players[myPlayerId]?.isHost) {
        socket.emit('resetRound', { roomCode: myRoomCode });
    }
});

switchBox.addEventListener('click', (event) => {
    const me = currentGameState?.players[myPlayerId];
    if (!me || !me.isHost || currentGameState.state !== 'waiting') return;

    const clickedOption = event.target.closest('.switch-option');
    if (!clickedOption || clickedOption.dataset.mode === currentGameState.gameMode) return;

    const newMode = clickedOption.dataset.mode;
    socket.emit('changeMode', { roomCode: myRoomCode, newMode });
});

mainGameArea.addEventListener('click', (event) => {
    if (isAnimating || !currentGameState) return;
    const target = event.target.closest('.box, .player-card');
    if (!target) return;

    const me = currentGameState.players[myPlayerId];
    if (!me) return;

    if (currentGameState.state === 'playing' && currentGameState.currentTurnPlayerId === myPlayerId) {
        // 주제어 변경 가능 횟수를 2회 미만으로 체크
        const isTextClick = target.classList.contains('text-box') && currentGameState.textChangeCount < 2;
        const isNeutralTextClick = target.classList.contains('neutral-box');
        
        if (isTextClick) {
            animateAction(target, 'text-only', 500);
            socket.emit('changeTextBox', { roomCode: myRoomCode, boxId: target.id });
        } else if (isNeutralTextClick) {
            animateAction(target, 'neutral-text', 500, 50);
            socket.emit('changeEmoji', { roomCode: myRoomCode, boxId: target.id });
        }
    }

    if (target.id === 'box-r3c2') {
        if (currentGameState.state === 'waiting' && me.isHost) {
            socket.emit('startGame', { roomCode: myRoomCode, gameMode: currentGameState.gameMode });
        } else if (currentGameState.state === 'jackpot') {
            socket.emit('claimJackpot', { roomCode: myRoomCode });
        } else if (currentGameState.state === 'jackpot_claimed' && currentGameState.jackpotWinnerId === myPlayerId) {
            socket.emit('releaseJackpot', { roomCode: myRoomCode });
        }
    }
    
    if (target.classList.contains('player-card')) {
        if (currentGameState.state === 'jackpot_claimed' && currentGameState.jackpotWinnerId === myPlayerId) {
            const targetPlayerId = target.dataset.playerId;
            
            // '나혼자 말해요' 모드에서 타겟 플레이어에게 점수 부여
            if (currentGameState.gameMode === '나혼자 말해요') {
                socket.emit('claimPoint', { roomCode: myRoomCode, targetPlayerId });
            } 
            else if (currentGameState.gameMode === '모두가 말해요') {
                socket.emit('deductPoint', { roomCode: myRoomCode, targetPlayerId });
            }
        }
    }
});

// --- 로비 로직 ---
playerNameInput.addEventListener('input', () => { document.getElementById('room-actions').classList.toggle('hidden', !playerNameInput.value.trim()); });
document.getElementById('lobby-profile-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            myProfileImageSrc = e.target.result;
            document.getElementById('lobby-profile-preview').src = myProfileImageSrc;
        };
        reader.readAsDataURL(file);
    }
});

function handleCreateRoom() {
    const playerName = playerNameInput.value.trim();
    if (!playerName) return showToast('이름을 입력하세요!', 'error');
    socket.emit('createRoom', { playerName, profileImageSrc: myProfileImageSrc });
}

function handleJoinRoom() {
    const playerName = playerNameInput.value.trim();
    const roomCode = document.getElementById('room-code-input').value.trim().toUpperCase();
    if (!playerName || !roomCode) return showToast('이름과 초대 코드를 모두 입력하세요!', 'error');
    socket.emit('joinRoom', { roomCode, playerName, profileImageSrc: myProfileImageSrc });
}

function handleCopyCode() {
    navigator.clipboard.writeText(myRoomCode).then(() => showToast('초대 코드가 복사되었습니다!'));
}

// --- 소켓 이벤트 핸들러 ---
socket.on('connect', () => { myPlayerId = socket.id; });
socket.on('roomCreated', onRoomJoined);
socket.on('roomJoined', onRoomJoined);
socket.on('playerJoined', ({ playerName }) => showToast(`${playerName} 님이 입장했습니다.`, 'join'));
socket.on('playerLeft', ({ playerName }) => showToast(`${playerName} 님이 퇴장했습니다.`, 'leave'));
socket.on('error', ({ message }) => showToast(message, 'error'));
socket.on('newHost', ({ playerName }) => showToast(`${playerName} 님이 새로운 방장이 되었습니다.`, 'info'));
socket.on('gameStarted', () => { playFullGridAnimation(); });

socket.on('updateGameState', (gameState) => {
    if (!gameState) return;
    
    const oldTurnPlayerId = currentGameState ? currentGameState.currentTurnPlayerId : null;
    currentGameState = gameState;
    const newTurnPlayerId = gameState.currentTurnPlayerId;

    if (oldTurnPlayerId !== newTurnPlayerId && newTurnPlayerId && gameState.state === 'playing') {
        const newTurnPlayer = gameState.players[newTurnPlayerId];
        if (newTurnPlayer) {
            showTurnIndicator(`${newTurnPlayer.name} 플레이어의 턴입니다`, newTurnPlayer.color);
        }
    }

    if (!isAnimating) renderGame(gameState);
});

function onRoomJoined({ roomCode }) {
    myRoomCode = roomCode;
    lobbyContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
}

// --- 렌더링 및 유틸리티 함수 ---
function getContrastColor(hexColor) {
    if (hexColor.startsWith('#')) hexColor = hexColor.slice(1);
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155 ? '#000000' : '#FFFFFF';
}

function renderGame(gameState) {
    const me = gameState.players[myPlayerId];
    if (!me) return;

    document.getElementById('player-count-display').textContent = `참가 인원: ${Object.keys(gameState.players).length} / ${gameState.maxPlayers}`;
    resetButton.classList.toggle('hidden', !me.isHost);

    // 게임 모드 스위치 렌더링
    const isWaiting = gameState.state === 'waiting';
    switchBox.classList.toggle('disabled', !isWaiting || !me.isHost);
    switchBox.setAttribute('data-mode', gameState.gameMode);

    const thumb = switchBox.querySelector('.switch-thumb');
    const options = switchBox.querySelectorAll('.switch-option');
    options.forEach(opt => opt.classList.remove('active'));

    const firstOption = options[0];
    const secondOption = options[1];

    if (gameState.gameMode === '나혼자 말해요') {
        thumb.style.width = `${firstOption.offsetWidth}px`;
        thumb.style.transform = `translateX(0px)`;
        firstOption.classList.add('active');
    } else { // '모두가 말해요'
        thumb.style.width = `${secondOption.offsetWidth}px`;
        thumb.style.transform = `translateX(${firstOption.offsetWidth + 8}px)`; // 4px padding on each side
        secondOption.classList.add('active');
    }
    
    renderPlayerList(Object.values(gameState.players), gameState);
    renderGrid(gameState);
    updateClickableElements(gameState, me);
}

function renderPlayerList(players, gameState) {
    playerListBoard.innerHTML = '';
    
    // 게임 모드에 따라 플레이어 정렬
    const sortedPlayers = [...players].sort((a, b) => {
        if (gameState.gameMode === '모두가 말해요') {
            return a.cumulativeScore - b.cumulativeScore; // 점수 낮은 순 (오름차순)
        }
        return b.cumulativeScore - a.cumulativeScore; // 점수 높은 순 (내림차순)
    });

    sortedPlayers.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.dataset.playerId = player.id;
        card.style.borderColor = player.color;

        if (player.id === gameState.currentTurnPlayerId) card.classList.add('current-turn');
        if (player.id === gameState.jackpotWinnerId) card.classList.add('jackpot-winner');
        if (player.id === myPlayerId) card.classList.add('is-me');

        const hostBadge = player.isHost ? '<span style="color: #FFC107; margin-left: 5px;">👑</span>' : '';
        card.innerHTML = `<div class="profile-section"><img src="${player.imageSrc}" class="profile-image-preview" alt="${player.name} profile"></div><div class="content-section"><div class="player-info-text"><div class="player-name">${player.name}${hostBadge}</div></div><div class="player-score">🏆 ${player.cumulativeScore}</div></div>`;
        playerListBoard.appendChild(card);
    });
}

function renderGrid(gameState) {
    const { gridState, state, gameMode } = gameState;
    
    document.querySelectorAll('.box').forEach(b => b.classList.remove('highlight-neon'));

    if (!gridState) {
        clearGrid();
        return;
    }

    if(gridState.highlightedBoxIds) {
        gridState.highlightedBoxIds.forEach(id => {
            document.getElementById(id)?.classList.add('highlight-neon');
        });
    }

    Object.entries(gridState.textMap).forEach(([id, text]) => {
        const box = document.getElementById(id);
        const visual = gridState.colorShapeMap[id];
        if(box && visual) {
            box.innerHTML = `<div class="box-mark" style="color: ${visual.color}"><span>${visual.shape}</span></div><div class="box-text">${text}</div>`;
        }
    });
    
    Object.entries(gridState.specialBoxMap).forEach(([id, visual]) => {
        renderPositionalArrow(document.getElementById(id), visual);
    });

    const neutralText1El = document.getElementById('box-r3c1');
    const neutralText2El = document.getElementById('box-r3c3');
    neutralText1El.innerHTML = `<span class="neutral-text">${gridState.neutralText1}</span>`;
    neutralText2El.innerHTML = `<span class="neutral-text">${gridState.neutralText2}</span>`;
    
    if (state.startsWith('jackpot')) {
        neutralText1El.querySelector('.neutral-text').classList.add('jackpot-text');
        neutralText2El.querySelector('.neutral-text').classList.add('jackpot-text');
    }
    
    triggerBox.textContent = '';
    triggerBox.style.backgroundColor = '';
    triggerBox.style.color = '';

    if (state === 'waiting') {
        triggerBox.textContent = '게임 시작';
    } else if (gridState.triggerResult) {
        const { direction, dice } = gridState.triggerResult;
        if (gameMode === '모두가 말해요') {
            triggerBox.innerHTML = `<span class="direction-arrow" style="font-size: 4vh;">${direction}</span>`;
        } else {
            triggerBox.innerHTML = direction === '▲' ? `<span class="direction-arrow">${direction}</span><span class="dice-result">${dice}</span>` : `<span class="dice-result">${dice}</span><span class="direction-arrow">${direction}</span>`;
        }
    }

    if (state === 'jackpot_claimed' && gameState.jackpotWinnerId) {
        const winner = gameState.players[gameState.jackpotWinnerId];
        if (winner) {
            triggerBox.style.backgroundColor = winner.color;
            triggerBox.style.color = getContrastColor(winner.color);
        }
    }
}

function updateClickableElements(gameState, me) {
    const { state, currentTurnPlayerId, jackpotWinnerId, textChangeCount, gameMode } = gameState;
    const isMyTurn = currentTurnPlayerId === myPlayerId;

    document.querySelectorAll('.box, .player-card').forEach(el => el.classList.remove('clickable', 'point-target', 'deduct-target'));
    triggerBox.classList.remove('host-ready', 'jackpot-active');

    if (state === 'waiting' && me.isHost) {
        triggerBox.classList.add('host-ready', 'clickable');
    } else if (state === 'playing' && isMyTurn) {
        if (textChangeCount < 2) { // 2회 미만일 때만 클릭 가능
            document.querySelectorAll('.text-box').forEach(b => b.classList.add('clickable'));
        }
        document.querySelectorAll('.neutral-box').forEach(b => b.classList.add('clickable'));
    } else if (state === 'jackpot') {
        triggerBox.classList.add('jackpot-active', 'clickable');
    } else if (state === 'jackpot_claimed' && jackpotWinnerId === myPlayerId) {
        triggerBox.classList.add('clickable');
        if (gameMode === '나혼자 말해요') {
            document.querySelectorAll('.player-card').forEach(card => {
                card.classList.add('clickable', 'point-target'); // 모든 카드를 클릭 가능하게 변경
            });
        } else if (gameMode === '모두가 말해요') {
            document.querySelectorAll('.player-card').forEach(card => {
                card.classList.add('clickable', 'deduct-target');
            });
        }
    }
}

function clearGrid() {
    document.querySelectorAll('.grid-container .box').forEach(box => {
        if (box.id !== 'box-r3c2') box.innerHTML = '';
        box.classList.remove('highlight-neon');
    });
    triggerBox.textContent = '게임 시작';
    triggerBox.style.backgroundColor = '';
    triggerBox.style.color = '';
    if(currentGameState) {
        renderPlayerList(Object.values(currentGameState.players), currentGameState);
    }
}

// --- 애니메이션 함수 ---
function playFullGridAnimation() {
    isAnimating = true;
    const animationDuration = 2000;
    const animationIntervals = [];

    document.querySelectorAll('.box').forEach(box => {
        const interval = setInterval(() => renderRandomContent(box), 100);
        animationIntervals.push(interval);
    });

    setTimeout(() => {
        animationIntervals.forEach(clearInterval);
        isAnimating = false;
        if (currentGameState) renderGame(currentGameState);
    }, animationDuration);
}

function animateAction(element, type, duration, contentInterval = 100) {
    isAnimating = true;
    const animationIntervals = [];
    const topOuterBoxIds = ['box-r1c1', 'box-r1c2', 'box-r1c3', 'box-r2c1', 'box-r2c3'];
    const bottomOuterBoxIds = ['box-r4c1', 'box-r4c3', 'box-r5c1', 'box-r5c2', 'box-r5c3'];

    const neonInterval = setInterval(() => {
        document.querySelectorAll('.highlight-neon').forEach(el => el.classList.remove('highlight-neon'));
        const topId = topOuterBoxIds[Math.floor(Math.random() * topOuterBoxIds.length)];
        const bottomId = bottomOuterBoxIds[Math.floor(Math.random() * bottomOuterBoxIds.length)];
        document.getElementById(topId)?.classList.add('highlight-neon');
        document.getElementById(bottomId)?.classList.add('highlight-neon');
    }, 100);
    animationIntervals.push(neonInterval);
    
    const contentIntervalFn = setInterval(() => renderRandomContent(element, type), contentInterval);
    animationIntervals.push(contentIntervalFn);
    
    if (currentGameState.state !== 'jackpot' && currentGameState.state !== 'jackpot_claimed') {
         animateSpecialBoxes(duration, 50);
    }
    animateTriggerBox(duration, 100);

    setTimeout(() => {
        animationIntervals.forEach(clearInterval);
        isAnimating = false;
        if (currentGameState) renderGame(currentGameState);
    }, duration);
}

function animateSpecialBoxes(duration, intervalSpeed) {
    const specialBoxes = [document.getElementById('box-r2c2'), document.getElementById('box-r4c2')];
    const interval = setInterval(() => {
        specialBoxes.forEach(box => renderRandomContent(box, 'special'));
    }, intervalSpeed);
    setTimeout(() => {
        clearInterval(interval);
        if (currentGameState) renderGrid(currentGameState);
    }, duration);
}

function animateTriggerBox(duration, intervalSpeed) {
    const interval = setInterval(() => renderRandomContent(triggerBox, 'trigger'), intervalSpeed);
    setTimeout(() => {
        clearInterval(interval);
        if (currentGameState) renderGrid(currentGameState);
    }, duration);
}

function renderPositionalArrow(box, visual) {
    if (!box || !visual) { if (box) box.innerHTML = ''; return; }
    box.innerHTML = '';
    const { arrow, color, shape } = visual;
    const container = document.createElement('div');
    container.className = 'arrow-mark-container';
    container.style.color = color;
    
    const arrowSpan = document.createElement('span');
    arrowSpan.className = 'arrow';
    arrowSpan.textContent = arrow;

    const markSpan = document.createElement('span');
    markSpan.className = 'special-box-mark';
    markSpan.textContent = shape;

    let arrowGridArea = '';
    if (box.id === 'box-r2c2') {
        const map = { '←': '3 / 1', '↖': '1 / 1', '↑': '1 / 2', '↗': '1 / 3', '→': '3 / 3' };
        arrowGridArea = map[arrow];
    } else if (box.id === 'box-r4c2') {
        const map = { '←': '1 / 1', '↙': '3 / 1', '↓': '3 / 2', '↘': '3 / 3', '→': '1 / 3' };
        arrowGridArea = map[arrow];
    }
    if (arrowGridArea) arrowSpan.style.gridArea = arrowGridArea;
    
    container.appendChild(arrowSpan);
    container.appendChild(markSpan);
    box.appendChild(container);
}

function renderRandomContent(box, specificType = null) {
    const fiveColorsPalette = ['#ef5350', '#FDD835', '#66bb6a', '#1976D2', '#B39DDB'];
    const shapes = ['★', '●', '◆', '♠', '♥'];
    const neutralTexts = ["방향", "컬러", "마크", "네온"];
    const topArrowSymbols = ['←', '↖', '↑', '↗', '→'];
    const bottomArrowSymbols = ['←', '↙', '↓', '↘', '→'];

    let type = specificType;
    if (!type) {
        if (box.classList.contains('text-box')) type = 'text';
        else if (box.classList.contains('neutral-box')) type = 'neutral-text';
        else if (box.classList.contains('special')) type = 'special';
        else if (box.classList.contains('trigger')) type = 'trigger';
    }
    
    if (type === 'text') {
        const randomColor = fiveColorsPalette[Math.floor(Math.random() * fiveColorsPalette.length)];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const randomText = TEXT_DATABASE[Math.floor(Math.random() * TEXT_DATABASE.length)];
        box.innerHTML = `<div class="box-mark" style="color: ${randomColor}"><span>${randomShape}</span></div><div class="box-text">${randomText}</div>`;
    } else if (type === 'text-only') {
        const markElement = box.querySelector('.box-mark')?.outerHTML || '';
        const randomText = TEXT_DATABASE[Math.floor(Math.random() * TEXT_DATABASE.length)];
        box.innerHTML = `${markElement}<div class="box-text">${randomText}</div>`;
    } else if (type === 'neutral-text') {
        const randomNeutralText = neutralTexts[Math.floor(Math.random() * neutralTexts.length)];
        box.innerHTML = `<span class="neutral-text">${randomNeutralText}</span>`;
    } else if (type === 'special') {
        const randomColor = fiveColorsPalette[Math.floor(Math.random() * fiveColorsPalette.length)];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const arrowSymbols = box.id === 'box-r2c2' ? topArrowSymbols : bottomArrowSymbols;
        const randomArrow = arrowSymbols[Math.floor(Math.random() * arrowSymbols.length)];
        renderPositionalArrow(box, { arrow: randomArrow, color: randomColor, shape: randomShape });
    } else if (type === 'trigger') {
        const randomDirection = ['▲', '▼'][Math.floor(Math.random() * 2)];
        if (currentGameState && currentGameState.gameMode === '모두가 말해요') {
            box.innerHTML = `<span class="direction-arrow" style="font-size: 4vh;">${randomDirection}</span>`;
        } else {
            const randomDice = (Math.floor(Math.random() * 4) + 1) + (Math.floor(Math.random() * 4) + 1);
            box.innerHTML = randomDirection === '▲' ? `<span class="direction-arrow">${randomDirection}</span><span class="dice-result">${randomDice}</span>` : `<span class="dice-result">${randomDice}</span><span class="direction-arrow">${direction}</span>`;
        }
    }
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 3000);
    }, 3000);
}

function showTurnIndicator(message, color) {
    turnIndicatorPopup.textContent = message;
    turnIndicatorPopup.style.backgroundColor = color;
    turnIndicatorPopup.style.color = getContrastColor(color);
    turnIndicatorPopup.classList.add('show');
    setTimeout(() => {
        turnIndicatorPopup.classList.remove('show');
    }, 1000); // 1초 후 사라짐
}