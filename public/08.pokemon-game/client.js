// [수정] public/08.pokemon-game/client.js
// '포켓몬게임' 클라이언트 로직

const socket = io('/pokemon-game');

// --- 전역 변수 ---
let myRoomCode = '';
let myPlayerId = '';
let myProfileImageSrc = document.getElementById('lobby-profile-preview').src;
let currentGameState = null;
let isGridLocked = false;
let isTtsEnabled = true;

let penaltyTimerId = null;
let typingIntervalId = null; 

// [추가] TTS 안정성 강화를 위한 변수
let voices = []; // 로드된 음성 목록을 저장할 배열
let areVoicesLoaded = false; // 음성 목록 로드 완료 여부 플래그

// --- DOM Elements ---
const lobbyContainer = document.getElementById('lobby-container');
const gameContainer = document.getElementById('game-container');
const playerNameInput = document.getElementById('player-name-input');
const playerListBoard = document.getElementById('player-list-board');
const startGameButton = document.getElementById('start-game-button');
const resetGameButton = document.getElementById('reset-game-button');
const pokemonGridContainer = document.getElementById('pokemon-grid-container');
const questionDisplayArea = document.getElementById('question-display-area');
const pokemonDescriptionText = document.getElementById('pokemon-description');
const difficultyControls = document.getElementById('difficulty-controls');
const ttsToggleButton = document.getElementById('tts-toggle-btn');


// [추가] TTS 음성 목록을 비동기적으로 로드하는 함수
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        areVoicesLoaded = true;
        // console.log("음성 목록 로드 완료:", voices); // 디버깅용 로그
    }
}

// [추가] 브라우저가 음성 목록을 준비했을 때 loadVoices 함수를 호출하도록 이벤트 리스너 설정
// 일부 브라우저는 이 이벤트가 없으면 getVoices()가 빈 배열을 반환합니다.
window.speechSynthesis.onvoiceschanged = loadVoices;
// 페이지 로드 시점에도 한 번 호출하여 즉시 로드되는 경우를 처리
loadVoices();


// --- 이벤트 리스너 통합 관리 ---
document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.id === 'lobby-profile-preview') document.getElementById('lobby-profile-input').click();
    if (target.id === 'create-room-btn') handleCreateRoom();
    if (target.id === 'join-room-btn') handleJoinRoom();
    if (target.id === 'copy-code-btn') handleCopyCode();

    if (target.id === 'tts-toggle-btn') {
        isTtsEnabled = !isTtsEnabled;
        target.classList.toggle('off', !isTtsEnabled);
        target.textContent = isTtsEnabled ? '🔊' : '🔇';

        if (isTtsEnabled && currentGameState && currentGameState.state === 'playing_guessing') {
            speak(currentGameState.currentPokemon.description, true);
        } else {
            window.speechSynthesis.cancel();
        }
    }

    if (!currentGameState) return;
    const me = currentGameState.players[myPlayerId];
    if (!me) return;

    if (me.isHost) {
        if (target.id === 'start-game-button' && currentGameState.state === 'waiting') socket.emit('startGame', { roomCode: myRoomCode });
        if (target.id === 'reset-game-button') socket.emit('resetGame', { roomCode: myRoomCode });
    }

    const difficultyBtn = target.closest('#difficulty-controls button');
    if (difficultyBtn && me.isHost && currentGameState.state === 'waiting') {
        const newDifficulty = difficultyBtn.dataset.difficulty;
        socket.emit('changeDifficulty', { roomCode: myRoomCode, newDifficulty });
    }

    const imageBox = target.closest('.pokemon-image-box');
    if (isGridLocked || !imageBox || !imageBox.dataset.pokemonId || currentGameState.state !== 'playing_guessing') return;

    const pokemonId = parseInt(imageBox.dataset.pokemonId, 10);
    socket.emit('guessPokemon', { roomCode: myRoomCode, pokemonId: pokemonId });
});

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
socket.on('gameStarted', () => { showToast('퀴즈가 시작됩니다!', 'info'); });

socket.on('wrongGuessBroadcast', ({ guesserId, guesserName }) => {
    let delayDuration, popupContent, popupDuration;
    if (guesserId === myPlayerId) {
        delayDuration = 3000; popupDuration = 2800;
        popupContent = `<div class="popup-simple-text">오답입니다! 3초간 멈춥니다.</div>`;
    } else {
        delayDuration = 1000; popupDuration = 1000;
        popupContent = `<div class="popup-simple-text">${guesserName} 님이 오답을 선택했습니다!</div>`;
    }
    showPopup(popupContent, popupDuration);
    isGridLocked = true;
    pokemonGridContainer.classList.add('disabled');
    if (penaltyTimerId) clearTimeout(penaltyTimerId);
    penaltyTimerId = setTimeout(() => {
        isGridLocked = false;
        if (currentGameState && currentGameState.state === 'playing_guessing') {
            pokemonGridContainer.classList.remove('disabled');
        }
        penaltyTimerId = null;
    }, delayDuration);
});

socket.on('updateGameState', (gameState) => {
    if (!gameState) return;
    const oldState = currentGameState ? currentGameState.state : null;
    const newState = gameState.state;
    currentGameState = gameState;

    if (newState === 'playing_guessing' && oldState !== 'playing_guessing') {
        const description = gameState.currentPokemon.description;
        startTypingEffect(description);
        speak(description, true);
    }

    if (oldState === 'playing_guessing' && newState === 'round_end') {
        window.speechSynthesis.cancel();
        if (typingIntervalId) {
            clearInterval(typingIntervalId);
            typingIntervalId = null;
        }

        if (penaltyTimerId) { clearTimeout(penaltyTimerId); penaltyTimerId = null; }
        isGridLocked = false;
        pokemonGridContainer.classList.remove('disabled');

        const winner = gameState.players[gameState.winnerId];
        const answerPokemon = gameState.currentPokemon;
        if (winner && answerPokemon) {
            pokemonDescriptionText.textContent = gameState.currentPokemon.description;
            const popupContent = `
                <div class="popup-content-box" style="border: 4px solid ${winner.color};">
                    <img src="${answerPokemon.image}" alt="${answerPokemon.name}" class="popup-pokemon-image">
                    <div class="popup-pokemon-name">${answerPokemon.name}</div>
                    <div class="popup-winner-text">${winner.name} 님이 정답을 맞혔습니다!</div>
                </div>
            `;
            showPopup(popupContent, 1500);
        }
    }
    renderAll(gameState);
});


socket.on('countdownTick', ({ count }) => { showCountdownPopup(count); });
function onRoomJoined({ roomCode }) { myRoomCode = roomCode; lobbyContainer.classList.add('hidden'); gameContainer.classList.remove('hidden'); document.body.classList.remove('in-lobby'); }

// --- 렌더링 및 게임 흐름 함수 ---
function renderAll(gameState) {
    const me = gameState.players[myPlayerId];
    if (!me) return;
    renderTopBarAndQuestion(gameState, me);
    renderPlayerList(Object.values(gameState.players), gameState);
    renderPokemonGrid(gameState);
}

function renderTopBarAndQuestion(gameState, me) {
    document.getElementById('player-count-display').textContent = `참가 인원: ${Object.keys(gameState.players).length} / ${gameState.maxPlayers}`;
    const isWaitingHost = me.isHost && gameState.state === 'waiting';
    startGameButton.classList.toggle('hidden', !isWaitingHost);
    difficultyControls.classList.toggle('hidden', !isWaitingHost);
    resetGameButton.classList.toggle('hidden', !me.isHost);
    if (isWaitingHost) {
        difficultyControls.querySelectorAll('button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.difficulty === gameState.difficulty);
        });
    }
    questionDisplayArea.classList.toggle('hidden', gameState.state === 'waiting');
}

function renderPlayerList(players, gameState) {
    playerListBoard.innerHTML = '';
    const sortedPlayers = [...players].sort((a, b) => b.cumulativeScore - a.cumulativeScore);
    sortedPlayers.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.style.borderColor = player.color;
        if (gameState.state === 'round_end' && player.id === gameState.winnerId) {
            card.classList.add('winner');
        }
        const hostBadge = player.isHost ? '<span style="color: #FFC107; margin-left: 5px;">👑</span>' : '';
        card.innerHTML = `<div class="profile-section"><img src="${player.imageSrc}" class="profile-image-preview"></div><div class="content-section"><div class="player-info-text"><div class="player-name">${player.name}${hostBadge}</div></div><div class="player-score">🏆 ${player.cumulativeScore}</div></div>`;
        playerListBoard.appendChild(card);
    });
}

function renderPokemonGrid(gameState) {
    pokemonGridContainer.innerHTML = '';
    const difficultyMap = { easy: 2, normal: 3, hard: 4 };
    const gridSize = difficultyMap[gameState.difficulty] || 4;
    const totalPokemons = gridSize * gridSize;
    pokemonGridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    pokemonGridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    const { state, gridPokemons, currentPokemon } = gameState;
    for (let i = 0; i < totalPokemons; i++) {
        const box = document.createElement('div');
        box.className = 'pokemon-image-box';
        const pokemon = gridPokemons[i];
        if (pokemon) {
            const img = document.createElement('img');
            img.src = pokemon.image; img.alt = pokemon.name;
            box.appendChild(img); box.dataset.pokemonId = pokemon.id;
        }
        switch(state) {
            case 'playing_guessing': box.classList.add('guessable'); break;
            case 'round_end':
                if (pokemon && currentPokemon) {
                    if (pokemon.id === currentPokemon.id) box.classList.add('correct-answer');
                    else box.classList.add('incorrect-answer');
                }
                break;
        }
        pokemonGridContainer.appendChild(box);
    }
}

// --- 유틸리티 함수 ---
function startTypingEffect(text) {
    if (typingIntervalId) {
        clearInterval(typingIntervalId);
    }
    pokemonDescriptionText.textContent = '';
    let charIndex = 0;

    typingIntervalId = setInterval(() => {
        if (charIndex < text.length) {
            pokemonDescriptionText.textContent += text[charIndex];
            charIndex++;
        } else {
            clearInterval(typingIntervalId);
            typingIntervalId = null;
        }
    }, 50);
}

// [수정] 음성 목록 로딩을 고려하여 수정한 speak 함수
function speak(text, loop = false) {
    if (!isTtsEnabled || typeof window.speechSynthesis === 'undefined') {
        return;
    }
    
    // [추가] 음성 목록이 아직 로드되지 않았다면, 0.1초 후에 다시 시도.
    // 이는 비동기 로딩 문제를 해결하기 위한 안전 장치입니다.
    if (!areVoicesLoaded) {
        setTimeout(() => speak(text, loop), 100);
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // [수정] 미리 로드된 'voices' 배열에서 한국어 음성을 찾습니다.
    const koreanVoice = voices.find(voice => voice.lang === 'ko-KR');
    if (koreanVoice) {
        utterance.voice = koreanVoice;
    }

    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
        if (loop && isTtsEnabled && currentGameState && currentGameState.state === 'playing_guessing') {
            setTimeout(() => speak(text, true), 100);
        }
    };

    window.speechSynthesis.speak(utterance);
}

function showPopup(content, duration) {
    const popup = document.getElementById('game-popup');
    if (!popup) return;
    popup.innerHTML = content;
    popup.classList.remove('hide');
    popup.classList.add('show');
    setTimeout(() => { popup.classList.remove('show'); popup.classList.add('hide'); }, duration);
}

function showCountdownPopup(count) {
    const popupContent = `<div class="countdown-circle"><span class="countdown-text">${count}</span></div>`;
    showPopup(popupContent, 450);
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => { toast.classList.add('fade-out'); setTimeout(() => toast.remove(), 500); }, 2500);
}