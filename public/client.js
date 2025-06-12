// public/client.js

const socket = io();
let gameConfig = null;
let currentUserData = {};
let currentRoomId = null;
let currentOwnerId = null;
let currentMode = null;
let userIntent = null;
let roomToJoin = null;
let allUsers = [];

const gameModeNames = {
    fakefan: '👻 가짜팬 찾기',
    guess_group: '🕵️‍♂️ 팬덤 맞추기'
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
const chatContainer = document.getElementById('chat-container');
// [삭제] leaveRoomBtn 변수 삭제
const managePlayersModal = document.getElementById('manage-players-modal');
const playerListContainer = document.getElementById('player-list-container');
const managePlayersModalClose = document.getElementById('manage-players-modal-close');
const backToLobbyBtn = document.getElementById('back-to-lobby-btn');

const singleChatView = document.getElementById('single-chat-view');
const singleChatMessages = document.getElementById('messages');
const singleChatInput = document.getElementById('input');
// [삭제] copyCodeBtn 변수 삭제
const managePlayersBtn = document.getElementById('manage-players-btn');
const guessGroupModal = document.getElementById('guess-group-modal');
const guessGroupTargetInfo = document.getElementById('guess-group-target-info');
const guessGroupChatLog = document.getElementById('guess-group-chat-log');
const guessGroupBtns = document.querySelectorAll('.guess-group-btn');
const guessGroupModalClose = document.getElementById('guess-group-modal-close');
const fandomGuessAdminControls = document.getElementById('fandom-guess-admin-controls');
const fandomKickBtn = document.getElementById('fandom-kick-btn');
let guessGroupTargetUser = null;

const multiChatView = document.getElementById('multi-chat-view');
const privateGuessModal = document.getElementById('private-guess-modal');
const privateGuessTargetInfo = document.getElementById('private-guess-target-info');
const privateGuessOptionsContainer = document.getElementById('private-guess-options-container');
const privateChatLog = document.getElementById('private-chat-log');
const privateGuessModalClose = document.getElementById('private-guess-modal-close');
const privateGuessAdminControls = document.getElementById('private-guess-admin-controls');
const privateKickBtn = document.getElementById('private-kick-btn');
let privateGuessTargetUser = null;
const channelParticipantsModal = document.getElementById('channel-participants-modal');
const channelParticipantsTitle = document.getElementById('channel-participants-title');
const channelParticipantsList = document.getElementById('channel-participants-list');
const channelParticipantsModalClose = document.getElementById('channel-participants-modal-close');

const modeStylesheet = document.getElementById('mode-stylesheet');
let sortable = null;
let resizingColumn = null;

function showToast(message) {
    toastPopup.textContent = message;
    toastPopup.classList.remove('hidden');
    setTimeout(() => { toastPopup.classList.add('hidden'); }, 2500);
}
function updateColumnUIVisibility() {
    if (currentMode !== 'fakefan') return;
    const streamerIdToFandomId = new Map(gameConfig.streamers.map(s => [s.id, s.fandom.id]));
    document.querySelectorAll('.chat-column').forEach(column => {
        const columnStreamerId = column.dataset.streamerId;
        const form = column.querySelector('.chat-form');
        // [수정] copyBtn 대신 settings-container를 선택하여 표시 여부 결정
        const settingsContainer = column.querySelector('.settings-container');
        const headerTitle = column.querySelector('.column-title');
        let belongsToChannel = false;
        if ((currentUserData.role === 'streamer' && currentUserData.streamerId === columnStreamerId) || socket.id === currentOwnerId) {
            headerTitle.style.cursor = 'pointer';
            headerTitle.onclick = () => openChannelParticipantsModal(columnStreamerId);
        } else {
            headerTitle.style.cursor = 'default';
            headerTitle.onclick = null;
        }
        if ((currentUserData.role === 'streamer' && currentUserData.streamerId === columnStreamerId) || 
            (currentUserData.role === 'fan' && currentUserData.fanGroup === streamerIdToFandomId.get(columnStreamerId))) {
            belongsToChannel = true;
        }
        form.classList.toggle('hidden', !belongsToChannel);
        // [수정] copyBtn 대신 settings-container의 표시 여부 결정
        if (settingsContainer) {
            settingsContainer.classList.toggle('hidden', !belongsToChannel);
        }
    });
}
function updateUiForOwner() {
    const isOwner = socket.id === currentOwnerId;
    managePlayersBtn.classList.toggle('hidden', !isOwner);
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
function initializeResizeHandles() {
    document.querySelectorAll('.column-resize-handle').forEach(handle => {
        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            resizingColumn = handle.closest('.chat-column');
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'ns-resize';
        });
    });
}
// [추가] 설정 메뉴 관련 이벤트 핸들러를 설정하는 함수
function setupSettingsMenus() {
    // 모든 설정 메뉴 숨기는 함수
    const hideAllSettingsMenus = () => {
        document.querySelectorAll('.settings-menu').forEach(menu => menu.classList.add('hidden'));
    };

    // 설정 버튼 클릭 시 메뉴 토글
    document.querySelectorAll('.settings-container > button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const menu = button.nextElementSibling;
            const isHidden = menu.classList.contains('hidden');
            hideAllSettingsMenus(); // 다른 메뉴는 모두 닫고
            if (isHidden) {
                menu.classList.remove('hidden'); // 현재 메뉴만 열기
            }
        });
    });

    // 메뉴의 '코드 복사' 버튼 기능
    document.querySelectorAll('.menu-copy-code-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentRoomId) navigator.clipboard.writeText(currentRoomId).then(() => showToast('코드 복사 완료!'));
            hideAllSettingsMenus();
        });
    });
    
    // 메뉴의 '방 나가기' 버튼 기능
    document.querySelectorAll('.menu-leave-room-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('정말로 방을 나가시겠습니까? 로비로 이동합니다.')) {
                window.location.reload();
            }
            hideAllSettingsMenus();
        });
    });

    // 문서의 다른 곳을 클릭하면 모든 메뉴를 닫음
    document.addEventListener('click', hideAllSettingsMenus);
}


function showChatRoom() {
    mainMenu.classList.add('hidden');
    profileSetup.classList.add('hidden');
    chatContainer.classList.remove('hidden');
    document.body.classList.add('in-chat');

    if (currentMode === 'fakefan') {
        modeStylesheet.href = '/fake_fan.css';
        chatContainer.className = 'multi-view-active';
        singleChatView.classList.add('hidden');
        multiChatView.classList.remove('hidden');
        updateColumnUIVisibility();
        if (sortable) sortable.destroy();
        sortable = Sortable.create(multiChatView, { animation: 150, handle: '.chat-column-header' });
        initializeResizeHandles();
    } else {
        modeStylesheet.href = '/fandom_guess.css';
        chatContainer.className = 'single-view-active';
        multiChatView.classList.add('hidden');
        singleChatView.classList.remove('hidden');
        singleChatInput.focus();
    }
    // [추가] 채팅방이 표시될 때 설정 메뉴 기능 활성화
    setupSettingsMenus();
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

backToLobbyBtn.addEventListener('click', () => {
    profileSetup.classList.add('hidden');
    mainMenu.classList.remove('hidden');
});
// [삭제] copyCodeBtn 관련 이벤트 리스너 삭제
managePlayersBtn.addEventListener('click', () => managePlayersModal.classList.remove('hidden'));
guessGroupModalClose.onclick = () => guessGroupModal.classList.add('hidden');
// [삭제] column-copy-code-btn 관련 이벤트 리스너 삭제
privateGuessModalClose.onclick = () => privateGuessModal.classList.add('hidden');
channelParticipantsModalClose.onclick = () => channelParticipantsModal.classList.add('hidden');
managePlayersModalClose.onclick = () => managePlayersModal.classList.add('hidden');
document.querySelectorAll('.chat-form, #form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const message = input.value.trim();
        if (message) {
            const chatGroupId = form.dataset.groupid || 'main';
            socket.emit('chat message', { message, chatGroupId });
            input.value = '';
        }
    });
});
// [삭제] leaveRoomBtn 관련 이벤트 리스너 삭제
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
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        [managePlayersModal, guessGroupModal, privateGuessModal, channelParticipantsModal].forEach(modal => {
            if (!modal.classList.contains('hidden')) modal.classList.add('hidden');
        });
        // [추가] ESC 키로 설정 메뉴도 닫기
        document.querySelectorAll('.settings-menu').forEach(menu => menu.classList.add('hidden'));
    }
});

document.addEventListener('mousemove', (e) => {
    if (!resizingColumn) return;
    const rect = resizingColumn.getBoundingClientRect();
    const newHeight = e.clientY - rect.top;
    resizingColumn.style.height = `${Math.max(200, newHeight)}px`;
});

document.addEventListener('mouseup', () => {
    if (resizingColumn) {
        resizingColumn = null;
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
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
    allUsers = users;
    if (currentMode === 'fakefan') {
        document.querySelectorAll('#multi-chat-view .messages').forEach(ul => ul.innerHTML = '');
    } else {
        singleChatMessages.innerHTML = '';
        document.getElementById('chat-room-title').textContent = gameModeNames[mode] || '채팅방';
    }
    updateUserList(users);
    showChatRoom();
    updateUiForOwner();
    addSystemMessage(null, `채팅방에 오신 것을 환영합니다!`);
}
socket.on('room created', onRoomJoined);
socket.on('join success', onRoomJoined);
socket.on('user joined', (data) => {
    allUsers = data.users;
    updateUserList(data.users);
    addSystemMessage(data.user, '님이 입장했습니다.');
});
socket.on('user left', (data) => {
    allUsers = data.users;
    updateUserList(data.users);
    const message = data.reason ? `님이 ${data.reason} 처리되었습니다.` : '님이 퇴장했습니다.';
    addSystemMessage(data.user, message);
});
socket.on('new host', (data) => {
    currentOwnerId = data.newOwner.id;
    allUsers = data.users;
    updateUserList(data.users);
    updateUiForOwner();
    addGameMessage(`👑 ${data.newOwner.nickname}님이 새로운 방장이 되었습니다.`, 'reveal');
});
socket.on('user list', (data) => {
    currentOwnerId = data.ownerId;
    allUsers = data.users;
    updateUserList(data.users);
    updateUiForOwner();
    if (currentMode === 'fakefan') updateColumnUIVisibility();
});
socket.on('kicked', (reason) => { alert(reason); window.location.reload(); });
socket.on('room closed', (reason) => { alert(reason); window.location.reload(); });
socket.on('error message', (message) => {
    alert(message);
    currentMode = null;
    mainMenu.classList.remove('hidden');
    profileSetup.classList.add('hidden');
    chatContainer.classList.add('hidden');
    document.body.classList.remove('in-chat');
});
socket.on('chat message', (data) => {
    const { user, message, chatGroupId } = data;
    const targetMessageList = document.getElementById(chatGroupId === 'main' ? 'messages' : `messages-${chatGroupId}`);
    if (!targetMessageList) return;
    const item = document.createElement('li');
    item.dataset.userId = user.id;
    item.dataset.userRole = user.role;
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
    const pfpElement = item.querySelector('.chat-pfp');
    if (currentUserData.role === 'streamer' && user.role === 'fan') {
        if (currentMode === 'fakefan') {
            const channelStreamerId = targetMessageList.closest('.chat-column').dataset.streamerId;
            if (currentUserData.streamerId === channelStreamerId) {
                pfpElement.classList.add('clickable');
                pfpElement.onclick = () => openPrivateGuessModal(user, channelStreamerId);
            }
        } else if (currentMode === 'guess_group') {
            pfpElement.classList.add('clickable');
            pfpElement.onclick = () => openFandomGuessModal(user);
        }
    }
    targetMessageList.appendChild(item);
    targetMessageList.scrollTop = targetMessageList.scrollHeight;
});
socket.on('guess result', (data) => {
    if (data.success) {
        addGameMessage(data.message, 'success', { fanGroup: data.fanGroup, fanTier: data.fanTier }, data.chatGroupId);
    } else {
        addGameMessage(data.message, 'fail', null, data.chatGroupId);
    }
});
function updateUserList(users) {
    allUsers = users;
    playerListContainer.innerHTML = '';
    const isOwner = socket.id === currentOwnerId;
    users.forEach(user => {
        let pfpSrcForList = user.pfp;
        if (currentMode === 'guess_group' && user.role === 'fan') pfpSrcForList = '/images/ghost.png';
        const playerItem = document.createElement('div');
        playerItem.className = 'player-list-item';
        let kickBtnHtml = isOwner && user.id !== socket.id ? `<button class="kick-btn" data-id="${user.id}">내보내기</button>` : '';
        playerItem.innerHTML = `<img src="${pfpSrcForList}" alt="pfp" class="player-pfp"><span class="player-name">${user.nickname} ${user.id === currentOwnerId ? '👑' : ''}</span>${kickBtnHtml}`;
        if (currentMode === 'guess_group' && currentUserData.role === 'streamer' && user.role === 'fan') {
            playerItem.style.cursor = 'pointer';
            playerItem.onclick = (e) => {
                if (e.target.tagName !== 'BUTTON') openFandomGuessModal(user);
            };
        }
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
    if (currentMode === 'fakefan') updateColumnUIVisibility();
}
function openChannelParticipantsModal(streamerId) {
    const streamer = gameConfig.streamers.find(s => s.id === streamerId);
    if (!streamer) return;
    channelParticipantsTitle.textContent = `${streamer.name} 채널 참가자`;
    channelParticipantsList.innerHTML = '';
    const streamerIdToFandomId = new Map(gameConfig.streamers.map(s => [s.id, s.fandom.id]));
    const participants = allUsers.filter(user => 
        (user.role === 'streamer' && user.streamerId === streamerId) ||
        (user.role === 'fan' && user.fanGroup === streamerIdToFandomId.get(streamerId))
    );
    participants.forEach(user => {
        const card = document.createElement('div');
        card.className = 'participant-card';
        const pfp = document.createElement('img');
        pfp.src = user.pfp;
        const name = document.createElement('p');
        name.textContent = user.nickname;
        if ((currentUserData.role === 'streamer' && currentUserData.streamerId === streamerId) && user.role === 'fan') {
            pfp.classList.add('clickable');
            pfp.onclick = () => {
                channelParticipantsModal.classList.add('hidden');
                openPrivateGuessModal(user, streamerId);
            };
        }
        card.appendChild(pfp);
        card.appendChild(name);
        if (socket.id === currentOwnerId && user.id !== socket.id) {
            const kickBtn = document.createElement('button');
            kickBtn.className = 'kick-btn';
            kickBtn.textContent = '내보내기';
            kickBtn.style.marginTop = '0.5rem';
            kickBtn.onclick = (e) => {
                e.stopPropagation();
                if (confirm(`정말로 ${user.nickname}님을 내보내시겠습니까?`)) {
                    socket.emit('kick player', user.id);
                    channelParticipantsModal.classList.add('hidden');
                }
            };
            card.appendChild(kickBtn);
        }
        channelParticipantsList.appendChild(card);
    });
    channelParticipantsModal.classList.remove('hidden');
}
function openPrivateGuessModal(targetUser, chatGroupId) {
    privateGuessTargetUser = targetUser;
    privateGuessTargetInfo.innerHTML = `<img src="${targetUser.pfp}" class="player-pfp"><span class="player-name">${targetUser.nickname}</span>`;
    privateGuessOptionsContainer.innerHTML = '';
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
                    targetUser: privateGuessTargetUser,
                    guessedRole: roleType,
                    guessedTierName: tier.name,
                    chatGroupId: chatGroupId
                });
                privateGuessModal.classList.add('hidden');
            };
            privateGuessOptionsContainer.appendChild(btn);
        });
    }
    privateChatLog.innerHTML = '';
    const sourceMessages = document.querySelectorAll(`#messages-${chatGroupId} .message-item`);
    sourceMessages.forEach(msgLi => {
        if (msgLi.dataset.userId === targetUser.id || msgLi.dataset.userId === currentUserData.id) {
            privateChatLog.appendChild(msgLi.cloneNode(true));
        }
    });
    privateGuessAdminControls.classList.toggle('hidden', socket.id !== currentOwnerId);
    privateKickBtn.onclick = () => {
        if (confirm('정말로 이 플레이어를 내보내시겠습니까?')) {
            socket.emit('kick player', targetUser.id);
            privateGuessModal.classList.add('hidden');
        }
    };
    privateGuessModal.classList.remove('hidden');
}
function openFandomGuessModal(targetUser) {
    guessGroupTargetUser = targetUser;
    guessGroupTargetInfo.innerHTML = `<img src="/images/ghost.png" class="player-pfp"><span class="player-name">${targetUser.nickname}</span>`;
    guessGroupChatLog.innerHTML = '';
    const sourceMessages = document.querySelectorAll('#messages .message-item');
    sourceMessages.forEach(msgLi => {
        const sender = allUsers.find(u => u.id === msgLi.dataset.userId);
        if (sender && (sender.id === targetUser.id || sender.role === 'streamer')) {
            guessGroupChatLog.appendChild(msgLi.cloneNode(true));
        }
    });
    fandomGuessAdminControls.classList.toggle('hidden', socket.id !== currentOwnerId);
    fandomKickBtn.onclick = () => {
        if (confirm('정말로 이 플레이어를 내보내시겠습니까?')) {
            socket.emit('kick player', targetUser.id);
            guessGroupModal.classList.add('hidden');
        }
    };
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
    if (currentMode === 'fakefan') {
        if (userData) {
            let targetStreamerId = userData.streamerId;
            if (userData.role === 'fan') {
                const streamer = gameConfig.streamers.find(s => s.fandom.id === userData.fanGroup);
                if (streamer) targetStreamerId = streamer.id;
            }
            if (targetStreamerId) {
                const targetList = document.getElementById(`messages-${targetStreamerId}`);
                if (targetList) {
                    targetList.appendChild(item);
                    targetList.scrollTop = targetList.scrollHeight;
                }
            }
        } else {
            document.querySelectorAll('#multi-chat-view .messages').forEach(ul => {
                const clonedItem = item.cloneNode(true);
                ul.appendChild(clonedItem);
                ul.scrollTop = ul.scrollHeight;
            });
        }
    } else {
        singleChatMessages.appendChild(item);
        singleChatMessages.scrollTop = singleChatMessages.scrollHeight;
    }
}
function addGameMessage(htmlContent, type, pfpData = null, chatGroupId = null) {
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
    if (currentMode === 'fakefan' && chatGroupId) {
        const targetList = document.getElementById(`messages-${chatGroupId}`);
        if(targetList) {
            targetList.appendChild(item);
            targetList.scrollTop = targetList.scrollHeight;
        }
    } else if (currentMode === 'guess_group') {
        singleChatMessages.appendChild(item);
        singleChatMessages.scrollTop = singleChatMessages.scrollHeight;
    } else {
         document.querySelectorAll('#multi-chat-view .messages').forEach(ul => {
            const clonedItem = item.cloneNode(true);
            ul.appendChild(clonedItem);
            ul.scrollTop = ul.scrollHeight;
        });
    }
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