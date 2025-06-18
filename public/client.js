// public/client.js

// 전역 변수: 소켓, 게임 설정, 유저 정보, 방 정보 등
const socket = io();
let gameConfig = null;
let currentUserData = {};
let currentRoomId = null;
let currentOwnerId = null;
let currentMode = null;
let userIntent = null;
let roomToJoin = null;
let allUsers = [];
let currentGuesses = {};
let currentRoundNumber = 1;
let isGameOver = false;

// 사운드 및 TTS 관련 전역 변수
let currentVolume = 1.0; // 사운드 및 TTS 볼륨. 0.0 ~ 1.0.
let lastVolumeBeforeMute = 1.0; // 음소거 직전 볼륨을 저장
let ttsVoices = []; // 사용 가능한 TTS 목소리 목록
const fandomVoiceMap = {}; // 팬덤별 목소리 매핑 객체

// 게임 모드 이름 매핑
const gameModeNames = {
    fakefan: '👻 가짜팬 찾기',
    guess_group: '🕵️‍♂️ 팬덤 맞추기'
};

// DOM 요소 캐싱
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
const streamerKeyGroup = document.getElementById('streamer-key-group');
const streamerKeyInput = document.getElementById('streamer-key-input');
const fanOptions = document.getElementById('fan-options');
const streamerSelect = document.getElementById('streamer-select');
const fanGroupSelect = document.getElementById('fan-group-select');
const fanTierSelect = document.getElementById('fan-tier-select');
const profilePreview = document.getElementById('profile-preview');
const nicknameGroup = document.getElementById('nickname-group');
const nicknameInput = document.getElementById('nickname-input');
const chatContainer = document.getElementById('chat-container');
const managePlayersModal = document.getElementById('manage-players-modal');
const playerListContainer = document.getElementById('player-list-container');
const managePlayersModalClose = document.getElementById('manage-players-modal-close');
const backToLobbyBtn = document.getElementById('back-to-lobby-btn');

// '팬덤 맞추기' 모드 관련 DOM 요소
const singleChatView = document.getElementById('single-chat-view');
const singleChatMessages = document.getElementById('messages');
const singleChatInput = document.getElementById('input');
const managePlayersBtn = document.getElementById('manage-players-btn');
const guessGroupModal = document.getElementById('guess-group-modal');
const guessGroupTargetInfo = document.getElementById('guess-group-target-info');
const guessGroupChatLog = document.getElementById('guess-group-chat-log');
const guessGroupBtns = document.querySelectorAll('.guess-group-btn');
const guessGroupModalClose = document.getElementById('guess-group-modal-close');
const fandomGuessAdminControls = document.getElementById('fandom-guess-admin-controls');
const fandomKickBtn = document.getElementById('fandom-kick-btn');
let guessGroupTargetUser = null;

// '가짜팬 찾기' 모드 관련 DOM 요소
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
const otherFansListContainer = document.getElementById('other-fans-list');

// 게임 종료 모달 관련 DOM 요소
const gameOverModal = document.getElementById('game-over-modal');
const gameOverBody = document.getElementById('game-over-body');
const gameOverCloseBtn = document.getElementById('game-over-close-btn');

// 기타 전역 변수
const modeStylesheet = document.getElementById('mode-stylesheet');
let sortable = null;
let resizingColumn = null;

/**
 * 브라우저에 내장된 TTS 목소리를 비동기적으로 로드하고 팬덤별로 할당하는 함수.
 */
function loadTTSVoices() {
    window.speechSynthesis.onvoiceschanged = () => {
        ttsVoices = window.speechSynthesis.getVoices();
        const koreanVoices = ttsVoices.filter(voice => voice.lang === 'ko-KR');
        const fandoms = ['yeonbab', 'coral', 'digdan'];

        if (koreanVoices.length > 0) {
            fandoms.forEach((fandomId, index) => {
                fandomVoiceMap[fandomId] = koreanVoices[index % koreanVoices.length];
            });
        }
        console.log("TTS voices loaded and mapped:", fandomVoiceMap);
    };
    window.speechSynthesis.getVoices();
}


/**
 * 텍스트를 음성으로 변환하여 재생(TTS)하는 함수. 볼륨을 적용합니다.
 * @param {string} text - 읽어줄 텍스트.
 * @param {string} fanGroup - 팬의 소속 팬덤 ID. 이 값에 따라 목소리가 결정됩니다.
 */
function speak(text, fanGroup) {
    if (currentVolume === 0) return;

    const utterance = new SpeechSynthesisUtterance(text);
    let selectedVoice = null;

    window.speechSynthesis.cancel();

    if (currentMode === 'fakefan' && fanGroup && fandomVoiceMap[fanGroup]) {
        selectedVoice = fandomVoiceMap[fanGroup];
    } else {
        selectedVoice = ttsVoices.find(voice => voice.lang === 'ko-KR');
    }

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    utterance.volume = currentVolume;

    window.speechSynthesis.speak(utterance);
}

/**
 * 지정된 경로의 사운드를 재생하는 함수. 볼륨을 적용합니다.
 * @param {string} src - /sounds/ 폴더 아래의 사운드 파일 경로 (예: 'chat.MP3')
 */
function playSound(src) {
    if (currentVolume === 0) return;

    const sound = new Audio(`/sounds/${src}`);
    sound.volume = currentVolume;

    const playPromise = sound.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log(`Audio play failed for ${src}:`, error);
        });
    }
}

/**
 * 화면 상단에 토스트 메시지를 띄우는 함수
 * @param {string} message - 표시할 메시지
 */
function showToast(message) {
    toastPopup.textContent = message;
    toastPopup.classList.remove('hidden');
    setTimeout(() => { toastPopup.classList.add('hidden'); }, 2500);
}

/**
 * 모든 '라운드 종료' 버튼의 텍스트를 현재 라운드에 맞게 업데이트하는 함수
 */
function updateRoundEndButtons() {
    document.querySelectorAll('.end-round-btn').forEach(btn => {
        btn.textContent = `${currentRoundNumber}라운드 종료`;
        btn.disabled = false;
    });
}

/**
 * 게임 종료 후 '라운드 종료' 버튼을 '결과 다시보기'로 변경하는 함수
 */
function updateEndRoundButtonsAfterGameOver() {
    document.querySelectorAll('.end-round-btn').forEach(btn => {
        btn.textContent = '결과 다시보기';
        btn.disabled = false;
    });
}

/**
 * '가짜팬 찾기' 모드에서 각 채팅 채널의 UI를 유저 역할에 맞게 표시/숨김 처리하는 함수. 볼륨 조절 UI 포함.
 */
function updateColumnUIVisibility() {
    if (currentMode !== 'fakefan') return;
    const streamerIdToFandomId = new Map(gameConfig.streamers.map(s => [s.id, s.fandom.id]));
    document.querySelectorAll('.chat-column').forEach(column => {
        const columnStreamerId = column.dataset.streamerId;
        const form = column.querySelector('.chat-form');
        const settingsContainer = column.querySelector('.settings-container');
        const headerTitle = column.querySelector('.column-title');
        const endRoundBtn = form.querySelector('.end-round-btn');
        const volumeContainer = column.querySelector('.volume-control-container');

        let isMyChannel = currentUserData.role === 'streamer' && currentUserData.streamerId === columnStreamerId;

        if (isMyChannel || socket.id === currentOwnerId) {
            headerTitle.style.cursor = 'pointer';
            headerTitle.onclick = () => openChannelParticipantsModal(columnStreamerId);
        } else {
            headerTitle.style.cursor = 'default';
            headerTitle.onclick = null;
        }

        let belongsToChannel = (isMyChannel) || (currentUserData.role === 'fan' && currentUserData.fanGroup === streamerIdToFandomId.get(columnStreamerId));

        form.classList.toggle('hidden', !belongsToChannel);
        if (settingsContainer) {
            settingsContainer.classList.toggle('hidden', !belongsToChannel);
        }
        if (volumeContainer) {
            volumeContainer.classList.toggle('hidden', !belongsToChannel);
        }
        endRoundBtn.classList.toggle('hidden', !isMyChannel);

    });
}

/**
 * 방장 및 스트리머 여부에 따라 UI(플레이어 관리 버튼 등)를 업데이트하는 함수
 */
function updateUiForOwner() {
    const isStreamer = currentUserData.role === 'streamer';
    managePlayersBtn.classList.toggle('hidden', !isStreamer);
}

/**
 * 프로필 설정 UI를 유저가 선택한 역할에 따라 동적으로 변경하는 함수. 스트리머 인증 키 입력창을 제어합니다.
 */
function updateProfileSetupUI() {
    if (!gameConfig) return;
    const role = document.querySelector('input[name="role"]:checked').value;
    if (role === 'streamer') {
        streamerOptions.classList.remove('hidden');
        fanOptions.classList.add('hidden');
        nicknameGroup.classList.add('hidden');
        streamerKeyGroup.classList.remove('hidden');
        streamerKeyInput.value = '';

        const selectedStreamer = gameConfig.streamers.find(s => s.id === streamerSelect.value);
        if (selectedStreamer) nicknameInput.value = selectedStreamer.name;
    } else {
        streamerOptions.classList.add('hidden');
        fanOptions.classList.remove('hidden');
        nicknameGroup.classList.remove('hidden');
        streamerKeyGroup.classList.add('hidden');
        nicknameInput.value = '';
        nicknameInput.focus();
        updateFanTiers();
    }
    updateProfilePreview();
}

/**
 * 유저의 실제 역할과 상태에 맞는 프로필 사진 경로를 반환하는 함수 (모든 모드 공용)
 * @param {object} user - 유저 정보 객체 (isRevealed 포함)
 * @returns {string} - 프로필 사진 경로
 */
function getPfp(user) {
    if (!gameConfig || !user) return '/images/ghost.png';
    if (user.role === 'streamer') return user.pfp;

    const streamer = gameConfig.streamers.find(s => s.fandom.id === user.fanGroup);
    if (!streamer) return user.pfp;

    if (user.isRevealed) {
        const role = user.actualRole || getRole(user);
        if (role === 'yasik') return streamer.fandom.yasikPfp;
        if (role === 'superfan') return streamer.fandom.superFanPfp;
        return streamer.fandom.pfp;
    } else {
        if (currentMode === 'guess_group') return '/images/ghost.png';
        return user.pfp;
    }
}


/**
 * '가짜팬 찾기' 모드에서 유저의 역할을 반환하는 함수
 * @param {object} user - 유저 정보 객체
 * @returns {string} - 역할 ('fan', 'superfan', 'yasik')
 */
function getRole(user) {
    if (!user || !user.fanTier) return 'fan';
    const streamer = gameConfig.streamers.find(s => s.fandom.id === user.fanGroup);
    if (!streamer) return 'fan';
    const tierInfo = streamer.fandom.tiers.find(t => t.name === user.fanTier);
    if (!tierInfo) return 'fan';
    if (tierInfo.isYasik) return 'yasik';
    if (tierInfo.isSuperFan) return 'superfan';
    return 'fan';
}

/**
 * 프로필 설정 화면에서 선택한 역할에 따라 프로필 사진 미리보기를 업데이트하는 함수
 */
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

/**
 * 선택된 팬덤에 따라 팬 등급(티어) 선택 옵션을 업데이트하는 함수
 */
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

/**
 * '가짜팬 찾기' 모드에서 채팅창 높이 조절 핸들을 초기화하는 함수
 */
function initializeResizeHandles() {
    document.querySelectorAll('.column-resize-handle').forEach(handle => {
        handle.addEventListener('mousedown', (e) => {
            // [수정] 볼륨 조절 UI 드래그와의 충돌 방지
            if (e.target.closest('.volume-control-container')) return;
            e.preventDefault();
            resizingColumn = handle.closest('.chat-column');
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'ns-resize';
        });
    });
}

/**
 * 채팅방 내 설정 메뉴 동작을 설정하는 함수.
 */
function setupSettingsMenus() {
    const hideAllSettingsMenus = () => {
        document.querySelectorAll('.settings-menu').forEach(menu => menu.classList.add('hidden'));
    };

    document.querySelectorAll('.settings-container > button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const menu = button.nextElementSibling;
            const isHidden = menu.classList.contains('hidden');
            hideAllSettingsMenus();
            if (isHidden) {
                menu.classList.remove('hidden');
            }
        });
    });

    document.querySelectorAll('.menu-copy-code-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentRoomId) navigator.clipboard.writeText(currentRoomId).then(() => showToast('코드 복사 완료!'));
            hideAllSettingsMenus();
        });
    });

    document.querySelectorAll('.menu-leave-room-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('정말로 방을 나가시겠습니까? 로비로 이동합니다.')) {
                window.location.reload();
            }
            hideAllSettingsMenus();
        });
    });

    document.addEventListener('click', hideAllSettingsMenus);
}


/**
 * [수정] 로비/프로필 화면을 숨기고 선택된 모드에 맞는 채팅방 UI를 보여주는 함수. 볼륨 조절 이벤트 리스너를 설정합니다.
 */
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
        updateRoundEndButtons();
        if (sortable) sortable.destroy();
        sortable = Sortable.create(multiChatView, { 
            animation: 150, 
            handle: '.chat-column-header',
            // [수정] 볼륨 조절 UI는 드래그 핸들에서 제외
            filter: '.volume-control-container, .settings-container' 
        });
        initializeResizeHandles();
    } else {
        modeStylesheet.href = '/fandom_guess.css';
        chatContainer.className = 'single-view-active';
        multiChatView.classList.add('hidden');
        singleChatView.classList.remove('hidden');
        singleChatView.querySelector('.volume-control-container').classList.remove('hidden');
        singleChatInput.focus();
        updateRoundEndButtons();
        const endRoundBtn = document.querySelector('#form .end-round-btn');
        if (endRoundBtn) {
            endRoundBtn.classList.toggle('hidden', currentUserData.role !== 'streamer');
        }
    }
    setupSettingsMenus();

    // [신규] 새로운 볼륨 조절 UI 이벤트 리스너 설정
    document.querySelectorAll('.volume-btn').forEach(btn => {
        btn.textContent = currentVolume > 0 ? '🔊' : '🔇'; // 초기 아이콘 설정
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentVolume > 0) {
                lastVolumeBeforeMute = currentVolume;
                currentVolume = 0;
            } else {
                currentVolume = lastVolumeBeforeMute;
            }
            // 모든 볼륨 UI 동기화
            document.querySelectorAll('.volume-slider-vertical').forEach(s => s.value = currentVolume);
            document.querySelectorAll('.volume-btn').forEach(b => b.textContent = currentVolume > 0 ? '🔊' : '🔇');
        });
    });

    document.querySelectorAll('.volume-slider-vertical').forEach(slider => {
        slider.value = currentVolume; // 초기 위치 설정
        slider.addEventListener('input', (e) => {
            currentVolume = parseFloat(e.target.value);
            if (currentVolume > 0) {
                lastVolumeBeforeMute = currentVolume;
            }
            // 모든 볼륨 UI 동기화
            document.querySelectorAll('.volume-slider-vertical').forEach(s => s.value = currentVolume);
            document.querySelectorAll('.volume-btn').forEach(b => b.textContent = currentVolume > 0 ? '🔊' : '🔇');
        });
    });
}

//--- 이벤트 리스너 설정 ---//

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
        userData.streamerKey = streamerKeyInput.value.trim();
        if (!userData.streamerKey) {
            return alert('스트리머 인증 키를 입력해주세요.');
        }
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

// 모달 닫기 버튼 이벤트
managePlayersBtn.addEventListener('click', () => managePlayersModal.classList.remove('hidden'));
guessGroupModalClose.onclick = () => guessGroupModal.classList.add('hidden');
privateGuessModalClose.onclick = () => {
    privateGuessModal.classList.add('hidden');
    privateGuessTargetUser = null; // 모달 닫을 때 타겟 유저 정보 초기화
};
channelParticipantsModalClose.onclick = () => channelParticipantsModal.classList.add('hidden');
managePlayersModalClose.onclick = () => managePlayersModal.classList.add('hidden');
gameOverCloseBtn.onclick = () => gameOverModal.classList.add('hidden');

// 채팅 폼 제출 이벤트
document.querySelectorAll('.chat-form, #form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="text"], input:not([type])');
        const message = input.value.trim();
        if (message) {
            let chatGroupId = 'main';
            if (currentMode === 'fakefan') {
                chatGroupId = form.dataset.groupid;
            }
            if (!chatGroupId) {
                console.error("Chat group ID is not defined for this form.");
                return;
            }
            socket.emit('chat message', { message, chatGroupId });
            input.value = '';
        }
    });
});

// 라운드 종료 버튼 클릭 이벤트
document.querySelectorAll('.end-round-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (isGameOver) {
            gameOverModal.classList.remove('hidden');
        } else {
            if (confirm('정말로 라운드를 종료하고 결과를 확인하시겠습니까?')) {
                btn.disabled = true;
                socket.emit('end round');
            }
        }
    });
});

// 팬덤 추측 버튼 클릭 이벤트
guessGroupBtns.forEach(btn => {
    btn.onclick = () => {
        if (guessGroupTargetUser) {
            socket.emit('guess fan group', {
                targetUser: guessGroupTargetUser,
                guessedGroup: btn.dataset.group
            });
            guessGroupModal.classList.add('hidden');
        }
    };
});

// ESC 키로 모달/메뉴 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        [managePlayersModal, guessGroupModal, privateGuessModal, channelParticipantsModal, gameOverModal].forEach(modal => {
            if (!modal.classList.contains('hidden')) modal.classList.add('hidden');
        });
        document.querySelectorAll('.settings-menu').forEach(menu => menu.classList.add('hidden'));
    }
});

// '가짜팬 찾기' 모드 채팅창 높이 조절 이벤트
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

//--- 소켓 이벤트 핸들러 ---//

socket.on('server config', (config) => {
    gameConfig = config;
    initialize();
    loadTTSVoices();
});

socket.on('room mode response', ({ mode }) => {
    currentMode = mode;
    mainMenu.classList.add('hidden');
    profileSetup.classList.remove('hidden');
    profileSetupTitle.textContent = '프로필 설정';
    updateProfileSetupUI();
});

function onRoomJoined(data) {
    const { roomId, users, ownerId, mode, currentRound } = data;
    currentRoomId = roomId;
    currentOwnerId = ownerId;
    currentMode = mode;
    allUsers = users;
    currentRoundNumber = currentRound;
    isGameOver = false;
    currentGuesses = {};

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

socket.on('round advanced', (newRound) => {
    currentRoundNumber = newRound;
    updateRoundEndButtons();
});

socket.on('user joined', (data) => {
    playSound('join.MP3');
    allUsers = data.users;
    updateUserList(data.users);
    addSystemMessage(data.user, '님이 입장했습니다.');
});
socket.on('user left', (data) => {
    playSound('leave.MP3');
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
    if (currentMode === 'guess_group') {
        const endRoundBtn = document.querySelector('#form .end-round-btn');
        if (endRoundBtn) {
            endRoundBtn.classList.toggle('hidden', currentUserData.role !== 'streamer');
        }
    }
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
    userIntent = null;
    roomToJoin = null;
    mainMenu.classList.remove('hidden');
    profileSetup.classList.add('hidden');
    chatContainer.classList.add('hidden');
    document.body.classList.remove('in-chat');
});

/**
 * [수정] 채팅 메시지 화면 추가 및 모달 실시간 업데이트
 */
function addChatMessage(data) {
    playSound('chat.MP3');

    const { user, message, chatGroupId } = data;
    const targetMessageList = document.getElementById(chatGroupId === 'main' ? 'messages' : `messages-${chatGroupId}`);
    if (!targetMessageList) return;

    if (user.role === 'fan') {
        speak(message, user.fanGroup);
    }

    const item = document.createElement('li');
    item.dataset.userId = user.id;
    item.dataset.userRole = user.role;
    const liClasses = ['message-item'];

    if (user.role === 'streamer') {
        liClasses.push('streamer-message', `streamer-${user.streamerId}`);
    } else if (user.role === 'fan') {
        const fanData = allUsers.find(u => u.id === user.id);
        if (fanData?.isRevealed) {
            liClasses.push(`fan-group-${user.fanGroup}`);
        }
    }
    item.className = liClasses.join(' ');

    const pfpSrc = getPfp(allUsers.find(u => u.id === user.id) || user);

    const senderInfoDiv = document.createElement('div');
    senderInfoDiv.className = 'sender-info';
    senderInfoDiv.innerHTML = `<img src="${pfpSrc}" alt="pfp" class="chat-pfp"><span class="chat-nickname">${user.nickname}</span>`;

    if (user.role === 'fan' && currentUserData.role === 'streamer' && !isGameOver) {
        if (currentMode === 'fakefan') {
            const channelStreamerId = targetMessageList.closest('.chat-column').dataset.streamerId;
            const guessData = currentGuesses[user.id] && currentGuesses[user.id][channelStreamerId];
            if (guessData) {
                const guessTag = document.createElement('div');
                guessTag.className = 'guess-tag';
                guessTag.textContent = `${guessData.guessedTierName}?`;
                if (guessData.guessedRole === 'superfan') guessTag.classList.add('guess-tag-superfan');
                else if (guessData.guessedRole === 'yasik') guessTag.classList.add('guess-tag-yasik');
                senderInfoDiv.appendChild(guessTag);
            }
        } else if (currentMode === 'guess_group') {
            const guessData = currentGuesses[user.id] && currentGuesses[user.id][currentUserData.streamerId];
            if (guessData) {
                const guessTag = document.createElement('div');
                guessTag.className = 'guess-tag';
                guessTag.textContent = `${guessData.guessedFanGroupName}?`;
                guessTag.classList.add(`guess-tag-${guessData.guessedGroup}`);
                senderInfoDiv.appendChild(guessTag);
            }
        }
    }

    const messageBubbleDiv = document.createElement('div');
    messageBubbleDiv.className = 'message-bubble';
    messageBubbleDiv.innerHTML = `<p class="chat-message-text">${message}</p>`;

    if (user.role === 'fan') {
        messageBubbleDiv.style.cursor = 'pointer';
        messageBubbleDiv.dataset.fanGroup = user.fanGroup;
        messageBubbleDiv.addEventListener('click', () => {
            speak(message, messageBubbleDiv.dataset.fanGroup);
        });
    }

    item.appendChild(senderInfoDiv);
    item.appendChild(messageBubbleDiv);

    const pfpElement = item.querySelector('.chat-pfp');
    if (currentUserData.role === 'streamer' && user.role === 'fan' && !isGameOver) {
        pfpElement.classList.add('clickable');
        if (currentMode === 'fakefan') {
            const channelStreamerId = targetMessageList.closest('.chat-column').dataset.streamerId;
            if (currentUserData.streamerId === channelStreamerId) {
                pfpElement.onclick = () => openPrivateGuessModal(user, channelStreamerId);
            }
        } else if (currentMode === 'guess_group') {
            pfpElement.onclick = () => openFandomGuessModal(user);
        }
    }

    targetMessageList.appendChild(item);
    targetMessageList.scrollTop = targetMessageList.scrollHeight;

    // '정체 맞추기' 모달 실시간 업데이트 로직
    if (!privateGuessModal.classList.contains('hidden') && privateGuessTargetUser) {
        const modalStreamerId = privateGuessTargetInfo.dataset.streamerId;
        if (chatGroupId === modalStreamerId && (user.id === privateGuessTargetUser.id || user.id === currentUserData.id)) {
            // 새 메시지를 복제하여 모달에 추가
            privateChatLog.appendChild(item.cloneNode(true));
            privateChatLog.scrollTop = privateChatLog.scrollHeight;
        }
    }
}
socket.on('chat message', addChatMessage);

socket.on('guesses updated', (guesses) => {
    currentGuesses = guesses;
    document.querySelectorAll('.message-item .guess-tag').forEach(tag => tag.remove());
    if (currentUserData.role === 'streamer') {
        if (currentMode === 'fakefan') {
            document.querySelectorAll('.chat-column').forEach(column => {
                const channelStreamerId = column.dataset.streamerId;
                const messagesInColumn = column.querySelectorAll('.message-item[data-user-role="fan"]');
                messagesInColumn.forEach(msgItem => {
                    const userId = msgItem.dataset.userId;
                    const senderInfo = msgItem.querySelector('.sender-info');
                    const guessData = currentGuesses[userId] && currentGuesses[userId][channelStreamerId];
                    if (guessData) {
                        const guessTag = document.createElement('div');
                        guessTag.className = 'guess-tag';
                        guessTag.textContent = `${guessData.guessedTierName}?`;
                        if (guessData.guessedRole === 'superfan') guessTag.classList.add('guess-tag-superfan');
                        else if (guessData.guessedRole === 'yasik') guessTag.classList.add('guess-tag-yasik');
                        senderInfo.appendChild(guessTag);
                    }
                });
            });
        } else if (currentMode === 'guess_group') {
            const messagesInColumn = singleChatMessages.querySelectorAll('.message-item[data-user-role="fan"]');
            messagesInColumn.forEach(msgItem => {
                const userId = msgItem.dataset.userId;
                const senderInfo = msgItem.querySelector('.sender-info');
                const guessData = currentGuesses[userId] && currentGuesses[userId][currentUserData.streamerId];
                if (guessData) {
                    const guessTag = document.createElement('div');
                    guessTag.className = 'guess-tag';
                    guessTag.textContent = `${guessData.guessedFanGroupName}?`;
                    guessTag.classList.add(`guess-tag-${guessData.guessedGroup}`);
                    senderInfo.appendChild(guessTag);
                }
            });
        }
    }
    // [수정] 모달이 열려있을 때 추측이 업데이트 되면, 모달 안의 팬 목록도 다시 그려서 태그를 갱신
    if (!privateGuessModal.classList.contains('hidden') && privateGuessTargetUser) {
        const streamerId = privateGuessTargetInfo.dataset.streamerId;
        openPrivateGuessModal(privateGuessTargetUser, streamerId);
    }
    if (!channelParticipantsModal.classList.contains('hidden')) {
        const streamerId = channelParticipantsTitle.dataset.streamerId;
        if (streamerId) openChannelParticipantsModal(streamerId);
    }
});

socket.on('reveal fandom', ({ streamerId, fans }) => {
    const column = document.getElementById(`chat-column-${streamerId}`);
    if (column) column.classList.add(`revealed-${streamerId}`);

    fans.forEach(revealedFan => {
        const userIndex = allUsers.findIndex(u => u.id === revealedFan.id);
        if (userIndex !== -1) {
            allUsers[userIndex].isRevealed = true;
            allUsers[userIndex].actualRole = revealedFan.actualRole;
        }

        document.querySelectorAll(`[data-user-id="${revealedFan.id}"] .chat-pfp, .participant-card[data-user-id="${revealedFan.id}"] img`).forEach(pfp => {
            pfp.src = getPfp(allUsers[userIndex]);
        });
        document.querySelectorAll(`.message-item[data-user-id="${revealedFan.id}"]`).forEach(item => {
            item.classList.add(`fan-group-${revealedFan.fanGroup}`);
            const guessTag = item.querySelector('.guess-tag');
            if (guessTag) guessTag.remove();
        });
    });
});

function revealAllFans() {
    allUsers.forEach(user => {
        if (user.role === 'fan') {
            const fanData = { ...user, isRevealed: true };
            document.querySelectorAll(`[data-user-id="${user.id}"]`).forEach(el => {
                const pfpElement = el.querySelector('.chat-pfp, .player-pfp, .system-pfp');
                if (pfpElement) pfpElement.src = getPfp(fanData);

                const nicknameElement = el.querySelector('.chat-nickname, .system-nickname');
                if (nicknameElement) {
                    nicknameElement.className = '';
                    const baseClass = el.classList.contains('system-message') ? 'system-nickname' : 'chat-nickname';
                    nicknameElement.classList.add(baseClass, `fan-group-${user.fanGroup}`);
                }
            });
        }
    });
}


socket.on('game over', (results) => {
    playSound('special.MP3');
    isGameOver = true;
    updateEndRoundButtonsAfterGameOver();

    allUsers = results.allUsers.map(u => ({ ...u, isRevealed: true, actualRole: u.actualRole || getRole(u) }));
    revealAllFans();

    gameOverBody.innerHTML = '';
    gameOverBody.className = '';

    if (currentMode === 'fakefan') {
        results.rankings.forEach(rankedStreamer => {
            const rankerDiv = document.createElement('div');
            rankerDiv.className = 'ranking-item';
            const streamerInfo = allUsers.find(u => u.streamerId === rankedStreamer.id);
            rankerDiv.innerHTML = `<img src="${streamerInfo.pfp}" alt="${rankedStreamer.name}" class="ranking-pfp"><div class="ranking-text-group"><div class="rank-and-name"><span class="rank rank-${rankedStreamer.rank}">${rankedStreamer.rank}</span> <span class="name">${rankedStreamer.name}</span></div><span class="round-info">(${rankedStreamer.finishedInRound}라운드 완료)</span></div>`;

            const groupDiv = document.createElement('div');
            groupDiv.className = 'fandom-identity-group';
            const streamerConfig = gameConfig.streamers.find(s => s.id === rankedStreamer.id);
            const fansOfStreamer = allUsers.filter(u => u.role === 'fan' && u.fanGroup === streamerConfig.fandom.id);

            fansOfStreamer.forEach(user => {
                const card = document.createElement('div');
                card.className = `identity-card fandom-${user.fanGroup}`;
                const tier = streamerConfig.fandom.tiers.find(t => t.name === user.fanTier);
                const roleText = tier ? tier.name : "팬";
                card.innerHTML = `<img src="${getPfp(user)}" alt="${user.nickname}"><p class="name">${user.nickname}</p><p class="role ${user.actualRole || ''}">${roleText}</p>`;
                groupDiv.appendChild(card);
            });

            gameOverBody.appendChild(rankerDiv);
            gameOverBody.appendChild(groupDiv);
        });
    } else if (currentMode === 'guess_group') {
        const rankingsContainer = document.createElement('div'); // 좌측 영역
        results.rankings.forEach(rankedStreamer => {
            const rankerDiv = document.createElement('div');
            rankerDiv.className = 'ranking-item';
            const streamerInfo = allUsers.find(u => u.streamerId === rankedStreamer.id);
            rankerDiv.innerHTML = `<img src="${streamerInfo.pfp}" alt="${rankedStreamer.name}" class="ranking-pfp"><div class="ranking-text-group"><div class="rank-and-name"><span class="rank rank-${rankedStreamer.rank}">${rankedStreamer.rank}</span> <span class="name">${rankedStreamer.name}</span></div><span class="round-info">(${rankedStreamer.finishedInRound}라운드 완료)</span></div>`;
            rankingsContainer.appendChild(rankerDiv);
        });

        const fanRevealContainer = document.createElement('div'); // 우측 영역
        fanRevealContainer.className = 'fandom-identity-group';
        const allFans = allUsers.filter(u => u.role === 'fan');
        allFans.forEach(user => {
            const card = document.createElement('div');
            card.className = `identity-card fandom-${user.fanGroup}`;
            const streamerConfig = gameConfig.streamers.find(s => s.fandom.id === user.fanGroup);
            const tier = streamerConfig.fandom.tiers.find(t => t.name === user.fanTier);
            const roleText = tier ? tier.name : "팬";
            card.innerHTML = `<img src="${getPfp(user)}" alt="${user.nickname}"><p class="name">${user.nickname}</p><p class="role">${roleText}</p>`;
            fanRevealContainer.appendChild(card);
        });

        gameOverBody.appendChild(rankingsContainer);
        gameOverBody.appendChild(fanRevealContainer);
    }

    gameOverModal.classList.remove('hidden');
});

function updateUserList(users) {
    allUsers = users.map(u => ({ ...u, isRevealed: allUsers.find(au => au.id === u.id)?.isRevealed || false }));
    playerListContainer.innerHTML = '';
    const isOwner = socket.id === currentOwnerId;
    allUsers.forEach(user => {
        const pfpSrcForList = getPfp(user);
        const playerItem = document.createElement('div');
        playerItem.className = 'player-list-item';
        let kickBtnHtml = isOwner && user.id !== socket.id ? `<button class="kick-btn" data-id="${user.id}">강퇴</button>` : '';
        playerItem.innerHTML = `<img src="${pfpSrcForList}" alt="pfp" class="player-pfp"><span class="player-name">${user.nickname} ${user.id === currentOwnerId ? '👑' : ''}</span>${kickBtnHtml}`;

        if (currentMode === 'guess_group' && currentUserData.role === 'streamer' && user.role === 'fan' && !isGameOver) {
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
            if (confirm('정말로 이 플레이어를 강퇴하시겠습니까?')) {
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
    channelParticipantsTitle.dataset.streamerId = streamerId;
    channelParticipantsList.innerHTML = '';
    const streamerIdToFandomId = new Map(gameConfig.streamers.map(s => [s.id, s.fandom.id]));
    const participants = allUsers.filter(user =>
        (user.role === 'streamer' && user.streamerId === streamerId) ||
        (user.role === 'fan' && user.fanGroup === streamerIdToFandomId.get(streamerId))
    );
    participants.forEach(user => {
        const card = document.createElement('div');
        card.className = 'participant-card';
        card.dataset.userId = user.id;

        if (currentGuesses[user.id] && currentGuesses[user.id][currentUserData.streamerId]) {
            card.classList.add('guessed');
        }

        const userData = allUsers.find(u => u.id === user.id) || user;

        if (userData?.isRevealed && userData.role === 'fan') {
            card.classList.add(`fandom-${userData.fanGroup}`);
            const roleElement = document.createElement('p');
            roleElement.className = 'participant-role';
            roleElement.textContent = userData.fanTier;
            card.appendChild(roleElement);
        }

        const pfp = document.createElement('img');
        pfp.src = getPfp(userData);

        const name = document.createElement('p');
        name.textContent = user.nickname;
        if ((currentUserData.role === 'streamer' && currentUserData.streamerId === streamerId) && user.role === 'fan' && !isGameOver) {
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
            kickBtn.textContent = '강퇴';
            kickBtn.style.marginTop = '0.5rem';
            kickBtn.onclick = (e) => {
                e.stopPropagation();
                if (confirm(`정말로 ${user.nickname}님을 강퇴하시겠습니까?`)) {
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


/**
 * [수정] '정체 맞추기' 모달을 열고, 같은 채널의 다른 팬 목록을 생성/업데이트하는 함수
 */
function openPrivateGuessModal(targetUser, chatGroupId) {
    privateGuessTargetUser = targetUser;
    privateGuessTargetInfo.dataset.streamerId = chatGroupId;

    const userData = allUsers.find(u => u.id === targetUser.id) || targetUser;

    privateGuessTargetInfo.innerHTML = '';
    privateGuessTargetInfo.className = '';

    if (userData.isRevealed) {
        privateGuessTargetInfo.classList.add(`fandom-${userData.fanGroup}`);
        const roleElement = document.createElement('p');
        roleElement.className = 'revealed-identity-tag';
        roleElement.textContent = userData.fanTier;
        privateGuessTargetInfo.appendChild(roleElement);
    }

    const pfpElement = document.createElement('img');
    pfpElement.src = getPfp(userData);
    pfpElement.className = 'player-pfp';
    privateGuessTargetInfo.appendChild(pfpElement);

    const nameElement = document.createElement('span');
    nameElement.className = 'player-name';
    nameElement.textContent = userData.nickname;
    privateGuessTargetInfo.appendChild(nameElement);

    privateGuessOptionsContainer.innerHTML = '';
    const streamer = gameConfig.streamers.find(s => s.fandom.id === targetUser.fanGroup);
    if (streamer) {
        const myGuess = (currentGuesses[targetUser.id] && currentGuesses[targetUser.id][currentUserData.streamerId])
            ? currentGuesses[targetUser.id][currentUserData.streamerId] : null;

        streamer.fandom.tiers.forEach(tier => {
            const btn = document.createElement('button');
            btn.className = 'guess-role-btn with-pfp';
            let pfpSrc = tier.isYasik ? streamer.fandom.yasikPfp : (tier.isSuperFan ? streamer.fandom.superFanPfp : streamer.fandom.pfp);
            let roleType = tier.isYasik ? 'yasik' : (tier.isSuperFan ? 'superfan' : 'fan');
            btn.innerHTML = `<img src="${pfpSrc}" alt="${tier.name}"><span>${tier.name}</span>`;

            if (myGuess && myGuess.guessedTierName === tier.name) {
                btn.classList.add('selected');
            }

            btn.onclick = () => {
                socket.emit('guess role', {
                    targetUser: privateGuessTargetUser,
                    guessedRole: roleType,
                    guessedTierName: tier.name,
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
            const clonedItem = msgLi.cloneNode(true);
            if (msgLi.dataset.userRole === 'fan') {
                const messageBubble = clonedItem.querySelector('.message-bubble');
                const messageText = messageBubble.querySelector('p').textContent;
                messageBubble.style.cursor = 'pointer';
                messageBubble.addEventListener('click', () => speak(messageText, msgLi.querySelector('.message-bubble').dataset.fanGroup));
            }
            privateChatLog.appendChild(clonedItem);
        }
    });

    // [신규] 같은 채널의 다른 팬 목록 생성 로직
    otherFansListContainer.innerHTML = '';
    const otherFansInChannel = allUsers.filter(u => 
        u.role === 'fan' && u.fanGroup === targetUser.fanGroup && u.id !== targetUser.id
    );

    otherFansInChannel.forEach(fan => {
        const fanItem = document.createElement('div');
        fanItem.className = 'other-fan-item';
        
        const fanPfp = `<img src="${getPfp(fan)}" class="other-fan-pfp">`;
        const fanName = `<span class="other-fan-name">${fan.nickname}</span>`;
        let fanGuessTag = '';

        const guessData = currentGuesses[fan.id] && currentGuesses[fan.id][currentUserData.streamerId];
        if (guessData) {
            fanGuessTag = `<div class="guess-tag">${guessData.guessedTierName}?</div>`;
        }

        fanItem.innerHTML = fanPfp + fanName + fanGuessTag;

        // 클릭 시 해당 팬으로 모달 내용 변경
        fanItem.addEventListener('click', () => {
            openPrivateGuessModal(fan, chatGroupId);
        });

        otherFansListContainer.appendChild(fanItem);
    });

    privateGuessAdminControls.classList.toggle('hidden', socket.id !== currentOwnerId);
    privateKickBtn.onclick = () => {
        if (confirm('정말로 이 플레이어를 강퇴하시겠습니까?')) {
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
        if (confirm('정말로 이 플레이어를 강퇴하시겠습니까?')) {
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
        const userState = allUsers.find(u => u.id === userData.id) || userData;
        const pfpSrc = getPfp(userState);

        let nicknameClasses = 'system-nickname';
        if (isGameOver || currentMode === 'fakefan') {
            if (userData.role === 'streamer') nicknameClasses += ` streamer-${userData.streamerId}`;
            else if (userData.fanGroup) nicknameClasses += ` fan-group-${userData.fanGroup}`;
        } else {
            if (userData.role === 'streamer') nicknameClasses += ` streamer-${userData.streamerId}`;
        }

        item.innerHTML = `
            <img src="${pfpSrc}" alt="pfp" class="system-pfp">
            <strong class="${nicknameClasses}">${userData.nickname}</strong>
            <span class="system-text">${text}</span>`;
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
            } else {
                document.querySelectorAll('#multi-chat-view .messages').forEach(ul => {
                    const clonedItem = item.cloneNode(true);
                    ul.appendChild(clonedItem);
                    ul.scrollTop = ul.scrollHeight;
                });
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

socket.on('game message', ({ message, type, chatGroupId }) => {
    addGameMessage(message, type, null, chatGroupId);
});

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
    if (currentMode === 'fakefan') {
        if (chatGroupId) {
            const targetList = document.getElementById(`messages-${chatGroupId}`);
            if (targetList) {
                targetList.appendChild(item);
                targetList.scrollTop = targetList.scrollHeight;
            }
        } else {
            document.querySelectorAll('#multi-chat-view .messages').forEach(ul => {
                const clonedItem = item.cloneNode(true);
                ul.appendChild(clonedItem);
                ul.scrollTop = ul.scrollHeight;
            });
        }
    } else if (currentMode === 'guess_group') {
        singleChatMessages.appendChild(item);
        singleChatMessages.scrollTop = singleChatMessages.scrollHeight;
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