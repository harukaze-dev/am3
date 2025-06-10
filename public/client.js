// public/client.js

const socket = io();
let gameConfig = null;
let currentUserData = {};
let currentRoomId = null;
let currentOwnerId = null;
let currentMode = null;
let userIntent = null;
let roomToJoin = null;

const gameModeNames = {
    superfan: '🕵️‍♂️ 슈퍼팬 찾기',
    guess_group: '👻 팬덤 맞추기'
};

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
// [수정됨] chat-container와 leave-room-btn 추가
const chatContainer = document.getElementById('chat-container');
const leaveRoomBtn = document.getElementById('leave-room-btn');
const copyCodeBtn = document.getElementById('copy-code-btn');
const managePlayersBtn = document.getElementById('manage-players-btn');
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const actionBtn = document.getElementById('action-btn');
const guessModal = document.getElementById('guess-modal');
const fanCardContainer = document.getElementById('fan-card-container');
const guessModalClose = document.getElementById('guess-modal-close');
const managePlayersModal = document.getElementById('manage-players-modal');
const playerListContainer = document.getElementById('player-list-container');
const managePlayersModalClose = document.getElementById('manage-players-modal-close');
const guessGroupModal = document.getElementById('guess-group-modal');
const guessGroupTargetInfo = document.getElementById('guess-group-target-info');
const guessGroupBtns = document.querySelectorAll('.guess-group-btn');
const guessGroupModalClose = document.getElementById('guess-group-modal-close');
let guessGroupTargetUser = null;
const guessRoleModal = document.getElementById('guess-role-modal');
const guessRoleTargetInfo = document.getElementById('guess-role-target-info');
const guessRoleOptionsContainer = document.getElementById('guess-role-options-container');
const guessRoleModalClose = document.getElementById('guess-role-modal-close');
let guessRoleTargetUser = null;

function showToast(message) {
    toastPopup.textContent = message;
    toastPopup.classList.remove('hidden');
    setTimeout(() => { toastPopup.classList.add('hidden'); }, 2500);
}
function updateUiForOwner() {
    if (socket.id === currentOwnerId) managePlayersBtn.classList.remove('hidden');
    else managePlayersBtn.classList.add('hidden');
}
function updateProfileSetupUI() {
    if (!gameConfig) return;
    const role = document.querySelector('input[name="role"]:checked').value;
    if (role === 'streamer') {
        streamerOptions.classList.remove('hidden');
        fanOptions.classList.add('hidden');
        nicknameGroup.classList.add('hidden');
        const selectedStreamer = gameConfig.streamers.find(s => s.id === streamerSelect.value);
        if (selectedStreamer) nicknameInput.value = selectedStreamer.name;
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
        if (!streamer) return;
        const selectedTierName = fanTierSelect.value;
        const tierInfo = streamer.fandom.tiers.find(t => t.name === selectedTierName);
        if (tierInfo?.isYasik) profilePreview.src = streamer.fandom.yasikPfp;
        else if (tierInfo?.isSuperFan) profilePreview.src = streamer.fandom.superFanPfp;
        else profilePreview.src = streamer.fandom.pfp;
    }
}
function updateFanTiers() {
    if (!gameConfig) return;
    const selectedGroupId = fanGroupSelect.value;
    const streamer = gameConfig.streamers.find(s => s.fandom.id === selectedGroupId);
    if (!streamer) return;
    let tiers = streamer.fandom.tiers;
    if (currentMode === 'guess_group') {
        tiers = tiers.filter(tier => !tier.isYasik && !tier.isSuperFan);
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
    chatContainer.classList.remove('hidden'); // [수정됨]
    document.body.classList.add('in-chat');
    input.focus();
    setupActionButton();
}
createRoomBtn.addEventListener('click', () => {
    userIntent = 'create';
    currentMode = document.querySelector('input[name="game-mode"]:checked').value;
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
fanTierSelect.addEventListener('change', updateProfilePreview);
confirmProfileBtn.addEventListener('click', () => {
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
        socket.emit('create room', { userData, mode: document.querySelector('input[name="game-mode"]:checked').value });
    } else if (userIntent === 'join') {
        socket.emit('join room', { roomId: roomToJoin, userData: userData });
    }
});
copyCodeBtn.addEventListener('click', () => {
    if (currentRoomId) navigator.clipboard.writeText(currentRoomId).then(() => showToast('코드 복사 완료!'));
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
guessModalClose.onclick = () => guessModal.classList.add('hidden');
guessGroupModalClose.onclick = () => guessGroupModal.classList.add('hidden');
guessGroupBtns.forEach(btn => {
    btn.onclick = () => {
        if (guessGroupTargetUser) {
            socket.emit('guess fan group', {
                streamerName: currentUserData.nickname,
                targetUser: guessGroupTargetUser,
                guessedGroup: btn.dataset.group
            });
            guessGroupModal.classList.add('hidden');
        }
    };
});
guessRoleModalClose.onclick = () => guessRoleModal.classList.add('hidden');

// [추가됨] 방 나가기 버튼 이벤트 리스너
leaveRoomBtn.addEventListener('click', () => {
    if (confirm('정말로 방을 나가시겠습니까? 로비로 이동합니다.')) {
        window.location.reload();
    }
});

socket.on('server config', (config) => { gameConfig = config; initialize(); });
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
    document.getElementById('chat-room-title').textContent = gameModeNames[mode] || '채팅방';
    addSystemMessage(null, `채팅방에 오신 것을 환영합니다!`);
    updateUserList(users);
    updateUiForOwner();
    showChatRoom();
}
socket.on('room created', onRoomJoined);
socket.on('join success', onRoomJoined);
socket.on('user joined', (data) => {
    updateUserList(data.users);
    addSystemMessage(data.user, '님이 입장했습니다.');
});
socket.on('user left', (data) => {
    updateUserList(data.users);
    const message = data.reason ? `님이 ${data.reason} 처리되었습니다.` : '님이 퇴장했습니다.';
    addSystemMessage(data.user, message);
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
    chatContainer.classList.add('hidden'); // [수정됨]
    document.body.classList.remove('in-chat');
});
socket.on('chat message', (data) => {
    const { user, message } = data;
    const item = document.createElement('li');
    const liClasses = ['message-item'];
    if (user.role === 'streamer') {
        liClasses.push('streamer-message');
        if (user.streamerId) liClasses.push(`streamer-${user.streamerId}`);
    } else {
        if (currentMode !== 'guess_group' && user.fanGroup) liClasses.push(`fan-group-${user.fanGroup}`);
    }
    item.className = liClasses.join(' ');
    let pfpSrc = user.pfp;
    if (currentMode === 'guess_group' && user.role === 'fan') pfpSrc = '/images/ghost.png';
    item.innerHTML = `<div class="sender-info"><img src="${pfpSrc}" alt="pfp" class="chat-pfp"><span class="chat-nickname">${user.nickname}</span></div><div class="message-bubble"><p class="chat-message-text">${message}</p></div>`;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});
socket.on('guess result', (data) => {
    if (data.success) addGameMessage(data.message, 'success', { fanGroup: data.fanGroup, fanTier: data.fanTier });
    else addGameMessage(data.message, 'fail');
});
function updateUserList(users) {
    fanCardContainer.innerHTML = '';
    playerListContainer.innerHTML = '';
    const isOwner = socket.id === currentOwnerId;
    users.forEach(user => {
        let pfpSrcForList = user.pfp;
        if (currentMode === 'guess_group' && user.role === 'fan') pfpSrcForList = '/images/ghost.png';
        if (currentUserData.role === 'streamer' && user.role === 'fan') {
            const card = document.createElement('div');
            card.className = 'fan-card';
            card.innerHTML = `<img src="${pfpSrcForList}" alt="pfp"><p>${user.nickname}</p>`;
            if (currentMode === 'superfan') card.onclick = () => openRoleGuessModal(user);
            else if (currentMode === 'guess_group') card.onclick = () => openFinalGuessGroupModal(user);
            fanCardContainer.appendChild(card);
        }
        const playerItem = document.createElement('div');
        playerItem.className = 'player-list-item';
        let kickBtnHtml = isOwner && user.id !== socket.id ? `<button class="kick-btn" data-id="${user.id}">내보내기</button>` : '';
        playerItem.innerHTML = `<img src="${pfpSrcForList}" alt="pfp" class="player-pfp"><span class="player-name">${user.nickname} ${user.id === currentOwnerId ? '👑' : ''}</span>${kickBtnHtml}`;
        playerListContainer.appendChild(playerItem);
    });
    document.querySelectorAll('.kick-btn').forEach(button => {
        button.onclick = (e) => {
            e.stopPropagation();
            if (confirm('정말로 이 플레이어를 내보내시겠습니까?')) {
                socket.emit('kick player', e.target.dataset.id);
                managePlayersModal.classList.add('hidden');
            }
        };
    });
}
function setupActionButton() {
    if (currentUserData.role === 'streamer') {
        actionBtn.classList.remove('hidden');
        actionBtn.className = `streamer-${currentUserData.streamerId}`;
        actionBtn.textContent = currentMode === 'superfan' ? '정체 맞추기' : '팬덤 맞추기';
        actionBtn.onclick = openPlayerSelectionModal;
    } else {
        actionBtn.classList.add('hidden');
    }
}
function openPlayerSelectionModal() {
    socket.emit('request user list');
    guessModal.classList.remove('hidden');
}
function openRoleGuessModal(targetUser) {
    guessModal.classList.add('hidden');
    guessRoleTargetUser = targetUser;
    guessRoleTargetInfo.innerHTML = `<img src="${targetUser.pfp}" class="player-pfp"><span class="player-name">${targetUser.nickname}</span>`;
    guessRoleOptionsContainer.innerHTML = '';
    const streamer = gameConfig.streamers.find(s => s.fandom.id === targetUser.fanGroup);
    if (streamer) {
        streamer.fandom.tiers.forEach(tier => {
            const btn = document.createElement('button');
            btn.className = 'guess-role-btn with-pfp';
            let pfpSrc = tier.isYasik ? streamer.fandom.yasikPfp : (tier.isSuperFan ? streamer.fandom.superFanPfp : streamer.fandom.pfp);
            let roleType = tier.isYasik ? 'yasik' : (tier.isSuperFan ? 'superfan' : 'fan');
            btn.innerHTML = `<img src="${pfpSrc}" alt="${tier.name}"><span>${tier.name}</span>`;
            btn.onclick = () => {
                socket.emit('guess role', {
                    streamerName: currentUserData.nickname,
                    targetUser: guessRoleTargetUser,
                    guessedRole: roleType,
                    guessedTierName: tier.name
                });
                guessRoleModal.classList.add('hidden');
            };
            guessRoleOptionsContainer.appendChild(btn);
        });
    }
    guessRoleModal.classList.remove('hidden');
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
        if (currentMode === 'guess_group' && userData.role === 'fan') pfpSrc = '/images/ghost.png';
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
    if (pfpData?.fanGroup) {
        const streamer = gameConfig.streamers.find(s => s.fandom.id === pfpData.fanGroup);
        if (streamer) {
            const tier = streamer.fandom.tiers.find(t => t.name === pfpData.fanTier);
            let pfpSrc = streamer.fandom.pfp;
            if (tier?.isYasik) pfpSrc = streamer.fandom.yasikPfp;
            else if (tier?.isSuperFan) pfpSrc = streamer.fandom.superFanPfp;
            item.innerHTML += `<img src="${pfpSrc}" class="game-message-pfp" alt="Fandom Profile">`;
        }
    }
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
}
function initialize() {
    if (!gameConfig) return;
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