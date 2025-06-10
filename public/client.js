// public/client.js

const socket = io();
let gameConfig = null; // 서버에서 받을 설정 정보
let currentUserData = {};
let currentRoomId = null;
let currentOwnerId = null;
let currentMode = null; // 현재 방의 게임 모드
let userIntent = null; // 'create' or 'join'
let roomToJoin = null;

// --- 사운드 설정 ---
let isSoundEnabled = localStorage.getItem('soundEnabled') !== 'false';
const chatSound = document.getElementById('chat-sound');
const joinSound = document.getElementById('join-sound');
const leaveSound = document.getElementById('leave-sound');
const specialSound = document.getElementById('special-sound');

// [추가됨] 모든 오디오 요소를 배열로 관리
const audioElements = [chatSound, joinSound, leaveSound, specialSound];
let hasUserInteracted = false; // 사용자의 첫 상호작용 여부 추적

// --- UI 요소 가져오기 ---
const toastPopup = document.getElementById('toast-popup');
const mainMenu = document.getElementById('main-menu');
const createRoomBtn = document.getElementById('create-room-btn');
const roomCodeInput = document.getElementById('room-code-input');
const joinRoomBtn = document.getElementById('join-room-btn');
const profileSetup = document.getElementById('profile-setup');
const confirmProfileBtn = document.getElementById('confirm-profile-btn');
const profileSetupTitle = document.getElementById('profile-setup-title');
const roleRadios = document.querySelectorAll('input[name="role"]');
const streamerOptions = document.getElementById('streamer-options');
const fanOptions = document.getElementById('fan-options');
const streamerSelect = document.getElementById('streamer-select');
const fanGroupSelect = document.getElementById('fan-group-select');
const fanTierSelect = document.getElementById('fan-tier-select');
const profilePreview = document.getElementById('profile-preview');
const nicknameGroup = document.getElementById('nickname-group');
const nicknameInput = document.getElementById('nickname-input');
const chatWrapper = document.getElementById('chat-wrapper');
const copyCodeBtn = document.getElementById('copy-code-btn');
const managePlayersBtn = document.getElementById('manage-players-btn');
const toggleSoundBtn = document.getElementById('toggle-sound-btn');
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const actionBtn = document.getElementById('action-btn');

// --- 모달 요소 ---
const guessModal = document.getElementById('guess-modal');
const fanCardContainer = document.getElementById('fan-card-container');
const guessModalClose = document.getElementById('guess-modal-close');
const revealConfirmModal = document.getElementById('reveal-confirm-modal');
const revealConfirmBtn = document.getElementById('reveal-confirm-btn');
const revealCancelBtn = document.getElementById('reveal-cancel-btn');
const managePlayersModal = document.getElementById('manage-players-modal');
const playerListContainer = document.getElementById('player-list-container');
const managePlayersModalClose = document.getElementById('manage-players-modal-close');
const guessGroupModal = document.getElementById('guess-group-modal');
const guessGroupTargetInfo = document.getElementById('guess-group-target-info');
const guessGroupBtns = document.querySelectorAll('.guess-group-btn');
const guessGroupModalClose = document.getElementById('guess-group-modal-close');
let guessGroupTargetUser = null;

// --- 헬퍼 함수 ---
function playSound(audioElement) {
    // [수정됨] 사용자가 상호작용했는지, 소리가 켜져 있는지 확인
    if (!isSoundEnabled || !audioElement || !hasUserInteracted) return;
    audioElement.currentTime = 0;
    audioElement.play().catch(error => {
        // 이 에러는 이제 거의 발생하지 않아야 함
        console.warn("오디오 재생에 실패했습니다.", error);
    });
}

// [추가됨] 사용자의 첫 상호작용 시 모든 오디오를 활성화하는 함수
function unlockAudio() {
    if (hasUserInteracted) return;
    console.log('Unlocking audio...');
    audioElements.forEach(audio => {
        audio.load(); // 오디오 로드
        // 음소거 상태로 재생 후 즉시 일시정지 (브라우저 정책 우회 트릭)
        const promise = audio.play();
        if(promise !== undefined) {
             promise.then(_ => {
                audio.pause();
                audio.currentTime = 0;
             }).catch(error => {
                console.error("Audio unlock failed for element:", audio.id, error);
             });
        }
    });
    hasUserInteracted = true;
}


function updateSoundButtonUI() {
    if (isSoundEnabled) {
        toggleSoundBtn.textContent = '🔊';
        toggleSoundBtn.classList.add('sound-on');
    } else {
        toggleSoundBtn.textContent = '🔇';
        toggleSoundBtn.classList.remove('sound-on');
    }
}

function showToast(message) {
    toastPopup.textContent = message;
    toastPopup.classList.remove('hidden');
    setTimeout(() => {
        toastPopup.classList.add('hidden');
    }, 2500);
}

function updateUiForOwner() {
    if (socket.id === currentOwnerId) {
        managePlayersBtn.classList.remove('hidden');
    } else {
        managePlayersBtn.classList.add('hidden');
    }
}

function updateProfileSetupUI() {
    if (!gameConfig) return;

    const role = document.querySelector('input[name="role"]:checked').value;
    if (role === 'streamer') {
        streamerOptions.classList.remove('hidden');
        fanOptions.classList.add('hidden');
        nicknameGroup.classList.add('hidden');
        const selectedStreamer = gameConfig.streamers.find(s => s.id === streamerSelect.value);
        if (selectedStreamer) {
            nicknameInput.value = selectedStreamer.name;
        }
    } else {
        streamerOptions.classList.add('hidden');
        fanOptions.classList.remove('hidden');
        nicknameGroup.classList.remove('hidden');
        nicknameInput.value = '';
        nicknameInput.focus();
        updateFanTiers();
    }
    updateProfilePreview();
}

function updateProfilePreview() {
    if (!gameConfig) return;

    const role = document.querySelector('input[name="role"]:checked').value;
    if (role === 'streamer') {
        const streamer = gameConfig.streamers.find(s => s.id === streamerSelect.value);
        if (streamer) profilePreview.src = streamer.pfp;
    } else {
        const streamer = gameConfig.streamers.find(s => s.fandom.id === fanGroupSelect.value);
        if (streamer) profilePreview.src = streamer.fandom.pfp;
    }
}

function updateFanTiers() {
    if (!gameConfig) return;

    const selectedGroupId = fanGroupSelect.value;
    const streamer = gameConfig.streamers.find(s => s.fandom.id === selectedGroupId);
    if (!streamer) return;

    let tiers = streamer.fandom.tiers;

    if (currentMode === 'guess_group') {
        tiers = tiers.filter(tier => !tier.isSuperFan);
    }

    fanTierSelect.innerHTML = '';
    tiers.forEach(tier => {
        const option = document.createElement('option');
        option.value = tier.name;
        option.textContent = tier.name;
        fanTierSelect.appendChild(option);
    });
}

function showChatRoom() {
    mainMenu.classList.add('hidden');
    profileSetup.classList.add('hidden');
    chatWrapper.classList.remove('hidden');
    document.body.classList.add('in-chat');
    input.focus();
    setupActionButton();
}


// --- 이벤트 리스너 ---
toggleSoundBtn.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled;
    localStorage.setItem('soundEnabled', isSoundEnabled);
    updateSoundButtonUI();
});


createRoomBtn.addEventListener('click', () => {
    userIntent = 'create';
    const selectedMode = document.querySelector('input[name="game-mode"]:checked').value;
    currentMode = selectedMode;
    mainMenu.classList.add('hidden');
    profileSetup.classList.remove('hidden');
    profileSetupTitle.textContent = '새로운 방 프로필 설정';
    updateProfileSetupUI();
});

joinRoomBtn.addEventListener('click', () => {
    const code = roomCodeInput.value.trim().toUpperCase();
    if (!code) return alert('초대 코드를 입력해주세요.');
    userIntent = 'join';
    roomToJoin = code;
    socket.emit('check room mode', code);
});

roleRadios.forEach(radio => radio.addEventListener('change', updateProfileSetupUI));
streamerSelect.addEventListener('change', updateProfileSetupUI);
fanGroupSelect.addEventListener('change', () => {
    updateFanTiers();
    updateProfilePreview();
});

// [수정됨] "입장하기" 버튼 클릭 시 오디오 활성화
confirmProfileBtn.addEventListener('click', () => {
    unlockAudio(); // 오디오 활성화!

    const nickname = nicknameInput.value.trim();
    if (!nickname) return alert('닉네임을 입력해주세요!');
    const role = document.querySelector('input[name="role"]:checked').value;
    const userData = { nickname, role };

    if (role === 'streamer') {
        const streamer = gameConfig.streamers.find(s => s.id === streamerSelect.value);
        userData.pfp = streamer.pfp;
        userData.streamerId = streamer.id;
    } else {
        const streamer = gameConfig.streamers.find(s => s.fandom.id === fanGroupSelect.value);
        userData.pfp = streamer.fandom.pfp;
        userData.fanGroup = streamer.fandom.id;
        userData.fanTier = fanTierSelect.value;
    }
    currentUserData = userData;
    if (userIntent === 'create') {
        const modeToCreate = document.querySelector('input[name="game-mode"]:checked').value;
        socket.emit('create room', { userData, mode: modeToCreate });
    } else if (userIntent === 'join') {
        socket.emit('join room', { roomId: roomToJoin, userData: userData });
    }
});

copyCodeBtn.addEventListener('click', () => {
    if (currentRoomId) { navigator.clipboard.writeText(currentRoomId).then(() => showToast('코드 복사 완료!')); }
});

managePlayersBtn.addEventListener('click', () => {
    socket.emit('request user list');
    managePlayersModal.classList.remove('hidden');
});
managePlayersModalClose.onclick = () => managePlayersModal.classList.add('hidden');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

revealConfirmBtn.onclick = () => {
    socket.emit('reveal identity', currentUserData);
    actionBtn.disabled = true;
    actionBtn.textContent = '공개 완료';
    revealConfirmModal.classList.add('hidden');
};
revealCancelBtn.onclick = () => revealConfirmModal.classList.add('hidden');
guessModalClose.onclick = () => guessModal.classList.add('hidden');

guessGroupModalClose.onclick = () => guessGroupModal.classList.add('hidden');
guessGroupBtns.forEach(btn => {
    btn.onclick = () => {
        if (guessGroupTargetUser) {
            const guessedGroup = btn.dataset.group;
            socket.emit('guess fan group', {
                streamerName: currentUserData.nickname,
                targetUser: guessGroupTargetUser,
                guessedGroup: guessedGroup
            });
            guessGroupModal.classList.add('hidden');
        }
    };
});

// --- 소켓 이벤트 핸들러 ---

socket.on('server config', (config) => {
    gameConfig = config;
    initialize();
});

socket.on('room mode response', ({ mode }) => {
    currentMode = mode;
    mainMenu.classList.add('hidden');
    profileSetup.classList.remove('hidden');
    profileSetupTitle.textContent = '프로필 설정';
    updateProfileSetupUI();
});

function onRoomJoined(data) {
    const { roomId, users, ownerId, mode } = data;
    currentRoomId = roomId;
    currentOwnerId = ownerId;
    currentMode = mode; 
    messages.innerHTML = '';
    addSystemMessage(null, `채팅방에 오신 것을 환영합니다! (모드: ${mode === 'superfan' ? '슈퍼팬 찾기' : '팬덤 맞추기'})`);
    updateUserList(users);
    updateUiForOwner();
    showChatRoom();
}

socket.on('room created', onRoomJoined);
socket.on('join success', onRoomJoined);

socket.on('user joined', (data) => {
    updateUserList(data.users);
    addSystemMessage(data.user, '님이 입장했습니다.');
    playSound(joinSound);
});

socket.on('user left', (data) => {
    updateUserList(data.users);
    const message = data.reason ? `님이 ${data.reason} 처리되었습니다.` : '님이 퇴장했습니다.';
    addSystemMessage(data.user, message);
    playSound(leaveSound);
});

socket.on('new host', (data) => {
    currentOwnerId = data.newOwner.id;
    updateUserList(data.users);
    updateUiForOwner();
    addGameMessage(`👑 ${data.newOwner.nickname}님이 새로운 방장이 되었습니다.`, 'reveal');
});

socket.on('user list', (data) => {
    currentOwnerId = data.ownerId;
    updateUserList(data.users);
});

socket.on('kicked', (reason) => { alert(reason); window.location.reload(); });
socket.on('room closed', (reason) => { alert(reason); window.location.reload(); });

socket.on('error message', (message) => {
    alert(message);
    currentMode = null;
    mainMenu.classList.remove('hidden');
    profileSetup.classList.add('hidden');
    chatWrapper.classList.add('hidden');
    document.body.classList.remove('in-chat');
});

socket.on('chat message', (data) => {
    const { user, message } = data;
    const item = document.createElement('li');
    const liClasses = ['message-item'];
    if (user.role === 'streamer') {
        liClasses.push('streamer-message');
        if(user.streamerId) liClasses.push(`streamer-${user.streamerId}`);
    } else {
        if(user.fanGroup) liClasses.push(`fan-group-${user.fanGroup}`);
    }
    item.className = liClasses.join(' ');
    
    let pfpSrc = user.pfp;
    if (currentMode === 'guess_group' && user.role === 'fan') {
        pfpSrc = '/images/ghost.png';
    }

    item.innerHTML = `
        <div class="sender-info">
            <img src="${pfpSrc}" alt="pfp" class="chat-pfp">
            <span class="chat-nickname">${user.nickname}</span>
        </div>
        <div class="message-bubble">
            <p class="chat-message-text">${message}</p>
        </div>
    `;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
    
    if (user.id !== socket.id) {
        playSound(chatSound);
    }
});

socket.on('identity revealed', (data) => {
    const messageHtml = `<strong>${data.nickname}</strong>님이 그 정체를 밝혔습니다. <span>'${data.tier}'</span>`;
    addGameMessage(messageHtml, 'reveal', { fanGroup: data.fanGroup, fanTier: data.tier });
    playSound(specialSound);
});

socket.on('guess result', (data) => {
    if (data.success) {
        addGameMessage(data.message, 'success', { fanGroup: data.fanGroup, fanTier: data.fanTier });
        playSound(specialSound);
    } else {
        addGameMessage(data.message, 'fail');
    }
});


// --- 로직 함수 ---
function updateUserList(users) {
    fanCardContainer.innerHTML = '';
    playerListContainer.innerHTML = '';
    const isOwner = socket.id === currentOwnerId;

    users.forEach(user => {
        let pfpSrcForList = user.pfp;
        if (currentMode === 'guess_group' && user.role === 'fan') {
            pfpSrcForList = '/images/ghost.png';
        }
        if (currentUserData.role === 'streamer' && user.role === 'fan') {
            const card = document.createElement('div');
            card.className = 'fan-card';
            card.innerHTML = `<img src="${pfpSrcForList}" alt="pfp"><p>${user.nickname}</p>`;
            if (currentMode === 'superfan') {
                card.onclick = () => makeSuperfanGuess(user);
            } else if (currentMode === 'guess_group') {
                card.onclick = () => openFinalGuessGroupModal(user);
            }
            fanCardContainer.appendChild(card);
        }
        const playerItem = document.createElement('div');
        playerItem.className = 'player-list-item';
        let kickBtnHtml = '';
        if (isOwner && user.id !== socket.id) {
            kickBtnHtml = `<button class="kick-btn" data-id="${user.id}">내보내기</button>`;
        }
        playerItem.innerHTML = `<img src="${pfpSrcForList}" alt="pfp" class="player-pfp"><span class="player-name">${user.nickname} ${user.id === currentOwnerId ? '👑' : ''}</span>${kickBtnHtml}`;
        playerListContainer.appendChild(playerItem);
    });

    document.querySelectorAll('.kick-btn').forEach(button => {
        button.onclick = (e) => {
            e.stopPropagation();
            const targetId = e.target.dataset.id;
            if (confirm('정말로 이 플레이어를 내보내시겠습니까?')) {
                socket.emit('kick player', targetId);
                managePlayersModal.classList.add('hidden');
            }
        };
    });
}

function setupActionButton() {
    actionBtn.classList.remove('hidden');
    if (currentUserData.role === 'streamer') {
        actionBtn.className = `streamer-${currentUserData.streamerId}`;
        if (currentMode === 'superfan') {
            actionBtn.textContent = '슈퍼팬 찾기';
            actionBtn.onclick = openPlayerSelectionModal;
        } else if (currentMode === 'guess_group') {
            actionBtn.textContent = '팬덤 맞추기';
            actionBtn.onclick = openPlayerSelectionModal;
        }
    } else if (currentUserData.role === 'fan') {
        const streamer = gameConfig.streamers.find(s => s.fandom.id === currentUserData.fanGroup);
        if (!streamer) {
            actionBtn.classList.add('hidden');
            return;
        }
        const myTier = streamer.fandom.tiers.find(t => t.name === currentUserData.fanTier);
        if ((currentMode === 'superfan' && myTier && myTier.isSuperFan) || currentMode === 'guess_group') {
            actionBtn.textContent = '정체 공개';
            actionBtn.className = `fan-group-${currentUserData.fanGroup}`;
            actionBtn.onclick = () => revealConfirmModal.classList.remove('hidden');
        } else {
             actionBtn.classList.add('hidden');
        }
    }
    else {
        actionBtn.classList.add('hidden');
    }
}

function openPlayerSelectionModal() {
    socket.emit('request user list');
    guessModal.classList.remove('hidden');
}

function makeSuperfanGuess(targetUser) {
    const streamer = gameConfig.streamers.find(s => s.fandom.id === targetUser.fanGroup);
    if (!streamer) return;
    const targetTier = streamer.fandom.tiers.find(t => t.name === targetUser.fanTier);

    if (targetTier && targetTier.isSuperFan) {
        socket.emit('guess identity', { streamerName: currentUserData.nickname, targetUser: targetUser });
    } else {
        const messageHtml = `<strong>${targetUser.nickname}</strong>님은 슈퍼 팬이 아닙니다!`;
        addGameMessage(messageHtml, 'fail');
    }
    guessModal.classList.add('hidden');
}

function openFinalGuessGroupModal(targetUser) {
    guessModal.classList.add('hidden');
    guessGroupTargetUser = targetUser;
    guessGroupTargetInfo.innerHTML = `<img src="/images/ghost.png" class="player-pfp"><span class="player-name">${targetUser.nickname}</span>`;
    guessGroupModal.classList.remove('hidden');
}

function addSystemMessage(userData, text) {
    const item = document.createElement('li');
    item.classList.add('system-message');
    if (userData) {
        let pfpSrc = userData.pfp;
        if (currentMode === 'guess_group' && userData.role === 'fan') {
            pfpSrc = '/images/ghost.png';
        }
        item.innerHTML = `<img src="${pfpSrc}" alt="pfp" class="system-pfp"><strong class="system-nickname">${userData.nickname}</strong><span class="system-text">${text}</span>`;
    } else {
        item.innerHTML = `<span class="system-text">${text}</span>`;
    }
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
}

function addGameMessage(htmlContent, type, pfpData = null) {
    const item = document.createElement('li');
    item.classList.add('game-message', `game-message-${type}`);
    item.innerHTML = htmlContent;

    if (pfpData && pfpData.fanGroup) {
        const streamer = gameConfig.streamers.find(s => s.fandom.id === pfpData.fanGroup);
        if(streamer) {
            const tier = streamer.fandom.tiers.find(t => t.name === pfpData.fanTier);
            const isSuperfan = tier && tier.isSuperFan;
            const pfpSrc = isSuperfan ? streamer.fandom.superFanPfp : streamer.fandom.pfp;
            item.innerHTML += `<img src="${pfpSrc}" class="game-message-pfp" alt="Fandom Profile">`;
        }
    }

    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
}

function initialize() {
    if (!gameConfig) return;

    updateSoundButtonUI();

    streamerSelect.innerHTML = '';
    gameConfig.streamers.forEach(streamer => {
        const option = document.createElement('option');
        option.value = streamer.id;
        option.textContent = streamer.name;
        streamerSelect.appendChild(option);
    });

    fanGroupSelect.innerHTML = '';
    gameConfig.streamers.forEach(streamer => {
        const option = document.createElement('option');
        option.value = streamer.fandom.id;
        option.textContent = streamer.fandom.name;
        fanGroupSelect.appendChild(option);
    });

    guessGroupBtns.forEach(btn => {
        const groupId = btn.dataset.group;
        const streamer = gameConfig.streamers.find(s => s.fandom.id === groupId);
        if (streamer) {
            btn.querySelector('img').src = streamer.fandom.pfp;
            btn.querySelector('span').textContent = streamer.fandom.name;
        }
    });

    updateProfileSetupUI();
}