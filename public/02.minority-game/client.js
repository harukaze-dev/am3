document.addEventListener('DOMContentLoaded', () => {
    const socket = io('/minority-game');

    let myRoomCode = '';
    let myPlayerId = '';
    let myProfileImageSrc = document.getElementById('lobby-profile-preview').src;
    let currentGameState = null;
    let isHistoryView = false;

    document.addEventListener('click', (event) => {
        const target = event.target;

        if (target.id === 'lobby-profile-preview') document.getElementById('lobby-profile-input').click();
        if (target.id === 'create-room-btn') handleCreateRoom();
        if (target.id === 'join-room-btn') handleJoinRoom();
        if (target.id === 'copy-code-btn') handleCopyCode();
        if (target.id === 'confirm-options-btn') handleConfirmOptions(target);
        if (target.id === 'view-results-button') socket.emit('viewResults', { roomCode: myRoomCode });
        if (target.id === 'reset-round-button') socket.emit('resetRound', { roomCode: myRoomCode });
        if (target.id === 'toggle-history-btn') handleToggleHistory();
        if (target.id === 'back-to-game-btn') renderGame(currentGameState);

        const choiceButton = target.closest('.btn-choice');
        if (choiceButton) handleSubmitChoice(choiceButton);

        const historyItem = target.closest('li[data-history-index]');
        if (historyItem) handleShowPastResults(historyItem);
    });

    const playerNameInput = document.getElementById('player-name-input');
    playerNameInput.addEventListener('input', () => {
        document.getElementById('room-actions').classList.toggle('hidden', !playerNameInput.value.trim());
    });

    document.getElementById('lobby-profile-input').addEventListener('change', handleProfileImageChange);

    function handleProfileImageChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                myProfileImageSrc = e.target.result;
                document.getElementById('lobby-profile-preview').src = myProfileImageSrc;
            };
            reader.readAsDataURL(file);
        }
    }

    function handleCreateRoom() {
        const playerName = playerNameInput.value.trim();
        if (!playerName) return alert('이름을 입력하세요!');
        socket.emit('createRoom', { playerName, profileImageSrc: myProfileImageSrc });
    }

    function handleJoinRoom() {
        const playerName = playerNameInput.value.trim();
        const roomCode = document.getElementById('room-code-input').value.trim().toUpperCase();
        if (!playerName || !roomCode) return alert('이름과 초대 코드를 모두 입력하세요!');
        socket.emit('joinRoom', { roomCode, playerName, profileImageSrc: myProfileImageSrc });
    }

    function handleCopyCode() {
        navigator.clipboard.writeText(myRoomCode).then(() => showToast('초대 코드가 복사되었습니다!'));
    }

    function handleConfirmOptions(button) {
        const optionAInput = document.getElementById('optionA-input');
        const optionBInput = document.getElementById('optionB-input');
        const isEditing = button.classList.contains('edit-mode');
        
        if (isEditing) {
            socket.emit('updateOptions', { roomCode: myRoomCode, optionA: '', optionB: '' });
        } else {
            const optionA = optionAInput.value.trim();
            const optionB = optionBInput.value.trim();
            if (!optionA || !optionB) return alert('두 선택지를 모두 입력해주세요.');
            socket.emit('updateOptions', { roomCode: myRoomCode, optionA, optionB });
        }
    }

    function handleSubmitChoice(button) {
        const card = button.closest('.player-card');
        if (!card || card.dataset.playerId !== myPlayerId) return;
        const choice = button.dataset.choice === 'cancel' ? null : button.dataset.choice;
        socket.emit('submitChoice', { roomCode: myRoomCode, choice });
    }

    function handleToggleHistory() {
        isHistoryView = !isHistoryView;
        renderSidePanel(currentGameState);
    }

    function handleShowPastResults(historyItem) {
        if (currentGameState) {
            const index = parseInt(historyItem.dataset.historyIndex, 10);
            const pastRound = currentGameState.history[index];
            if (pastRound) renderPastResults(pastRound);
        }
    }

    socket.on('connect', () => { myPlayerId = socket.id; });
    socket.on('roomCreated', onRoomJoined);
    socket.on('roomJoined', onRoomJoined);
    socket.on('playerJoined', ({ playerName }) => showToast(`${playerName} 님이 입장했습니다.`, 'join'));
    socket.on('playerLeft', ({ playerName }) => showToast(`${playerName} 님이 퇴장했습니다.`, 'leave'));
    socket.on('error', ({ message }) => { alert(message); });
    socket.on('newHost', ({ playerName }) => showToast(`${playerName} 님이 새로운 방장이 되었습니다.`, 'info'));
    socket.on('updateGameState', (gameState) => {
        if (!gameState) return;
        currentGameState = gameState;
        if (gameState.state === 'waiting') {
            renderGame(gameState);
        } else if (gameState.state === 'results') {
            renderResults(gameState);
        }
    });

    function onRoomJoined({ roomCode }) {
        myRoomCode = roomCode;
        document.body.classList.remove('in-lobby');
        document.getElementById('lobby-container').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
    }

    function renderGame(gameState) {
        const players = Object.values(gameState.players);
        const me = players.find(p => p.id === myPlayerId);
        if (!me) return;

        const amIHost = me.isHost;
        document.getElementById('player-count-display').textContent = `접속 인원: ${players.length} / ${gameState.maxPlayers}`;
        document.getElementById('main-game-area').classList.remove('hidden');
        document.getElementById('results').classList.add('hidden');
        document.getElementById('options-container').classList.remove('hidden');
        document.getElementById('host-controls').classList.toggle('hidden', !amIHost);
        document.getElementById('view-results-button').classList.toggle('hidden', !amIHost);
        document.getElementById('reset-round-button').classList.add('hidden');

        const optionAInput = document.getElementById('optionA-input');
        const optionBInput = document.getElementById('optionB-input');
        const confirmOptionsBtn = document.getElementById('confirm-options-btn');
        const areOptionsConfirmed = !!gameState.optionA && !!gameState.optionB;
        optionAInput.value = gameState.optionA;
        optionBInput.value = gameState.optionB;
        optionAInput.classList.toggle('confirmed', areOptionsConfirmed);
        optionBInput.classList.toggle('confirmed', areOptionsConfirmed);

        if (amIHost) {
            confirmOptionsBtn.classList.remove('hidden');
            confirmOptionsBtn.id = 'confirm-options-btn';
            optionAInput.disabled = areOptionsConfirmed;
            optionBInput.disabled = areOptionsConfirmed;
            confirmOptionsBtn.textContent = areOptionsConfirmed ? '주제 수정' : '주제 확정';
            confirmOptionsBtn.className = 'confirm-options-btn ' + (areOptionsConfirmed ? 'edit-mode' : 'confirm-mode');
        } else {
            confirmOptionsBtn.classList.add('hidden');
            optionAInput.disabled = true;
            optionBInput.disabled = true;
        }

        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        players.forEach(player => gameBoard.appendChild(createPlayerCard(player, player.id === myPlayerId, gameState)));

        renderSidePanel(gameState);
        document.getElementById('view-results-button').disabled = !players.every(p => p.submitted);
    }

    function createPlayerCard(player, isMe, gameState) {
        const card = document.createElement('div');
        card.className = `player-card ${player.submitted ? 'submitted' : ''}`;
        card.dataset.playerId = player.id;
        card.style.borderColor = player.color;
        card.style.setProperty('--tint-color', `${player.color}20`);
        
        let actionHtml = '';
        const areOptionsSet = gameState.optionA && gameState.optionB;

        if (isMe) {
            if (player.submitted) {
                const choiceText = player.choice === 'A' ? gameState.optionA : gameState.optionB;
                actionHtml = `<div class="player-action-area">
                    <div class="player-choice-display" style="background-color: var(--option${player.choice}-color); color: white;">'${choiceText}' 선택함</div>
                    <button class="btn-choice cancel" data-choice="cancel">취소</button>
                </div>`;
            } else if (areOptionsSet) {
                actionHtml = `<div class="player-action-area">
                    <button class="btn-choice option-a" data-choice="A">${gameState.optionA}</button>
                    <button class="btn-choice option-b" data-choice="B">${gameState.optionB}</button>
                </div>`;
            } else {
                actionHtml = `<div class="player-status-display">주제 선정 대기중...</div>`;
            }
        } else {
            actionHtml = `<div class="player-status-display">${player.submitted ? '선택 완료!' : '선택 대기중...'}</div>`;
        }
        
        card.innerHTML = `
            <div class="profile-section"><img src="${player.imageSrc}" class="profile-image-preview" alt="${player.name} profile"></div>
            <div class="content-section"><div class="player-info-text"><div class="player-name">${player.name}</div></div>${actionHtml}</div>`;
        return card;
    }

    function renderSidePanel(gameState) {
        document.getElementById('ranking-board').classList.toggle('hidden', isHistoryView);
        document.getElementById('history-board').classList.toggle('hidden', !isHistoryView);
        const title = isHistoryView ? '과거 라운드' : '누적 랭킹';
        const buttonText = isHistoryView ? '랭킹 보기' : '과거 기록';
        document.getElementById('side-panel-title').textContent = title;
        document.getElementById('toggle-history-btn').textContent = buttonText;
        if (isHistoryView) renderHistoryBoard(gameState.history);
        else renderRankingBoard(Object.values(gameState.players));
    }

    function renderRankingBoard(players) {
        players.sort((a, b) => b.cumulativeScore - a.cumulativeScore);
        let rank = 1;
        players.forEach((p, i) => {
            if (i > 0 && players[i].cumulativeScore < players[i-1].cumulativeScore) rank = i + 1;
            p.cumulativeRank = rank;
        });
        const listItems = players.map(p => {
            const isFirst = p.cumulativeRank === 1;
            return `<li class="${isFirst ? 'first-place' : ''}" style="--rank-color: ${p.color}">
                <span class="rank">${isFirst ? '👑' : p.cumulativeRank}</span>
                <img src="${p.imageSrc}" class="profile-image-rank" alt="${p.name} profile">
                <span class="name">${p.name}</span>
                <span class="score">${p.cumulativeScore}점</span></li>`;
        }).join('');
        document.getElementById('ranking-board').innerHTML = `<ol>${listItems}</ol>`;
    }
    
    function renderHistoryBoard(history) {
        const historyBoard = document.getElementById('history-board');
        if (history.length === 0) {
            historyBoard.innerHTML = '<p style="text-align:center; color:#888;">기록이 없습니다.</p>';
            return;
        }
        const listItems = history.map((round, index) => `<li data-history-index="${index}">${round.optionA || 'A'} vs ${round.optionB || 'B'}</li>`).reverse().join('');
        historyBoard.innerHTML = `<ol>${listItems}</ol>`;
    }
    
    function renderResults(gameState) {
        const latestHistory = gameState.history[gameState.history.length - 1];
        if (!latestHistory) return;
        const resultsHtml = renderResultsHtml(latestHistory, true);
        document.getElementById('results').innerHTML = resultsHtml;
        document.getElementById('main-game-area').classList.add('hidden');
        document.getElementById('options-container').classList.add('hidden');
        document.getElementById('results').classList.remove('hidden');
        document.getElementById('reset-round-button').classList.remove('hidden');
        document.getElementById('view-results-button').classList.add('hidden');
    }

    function renderPastResults(roundData) {
        const resultsHtml = renderResultsHtml(roundData, false);
        document.getElementById('results').innerHTML = resultsHtml;
        document.getElementById('main-game-area').classList.add('hidden');
        document.getElementById('options-container').classList.add('hidden');
        document.getElementById('results').classList.remove('hidden');
        document.getElementById('reset-round-button').classList.add('hidden');
        document.getElementById('view-results-button').classList.add('hidden');
    }

    function renderResultsHtml(roundData, isCurrentRound = false) {
        const { optionA, optionB, votes, winningChoice, players } = roundData;
        let winnerAnnouncementText = winningChoice ? `소수파인 '${winningChoice === 'A' ? optionA : optionB}' 선택자 승리!` : (votes.A === votes.B ? '동점이므로 무승부입니다!' : '몰표이므로 무승부입니다!');
        
        players.sort((a, b) => {
            const aIsWinner = a.choice === winningChoice;
            const bIsWinner = b.choice === winningChoice;
            if (aIsWinner !== bIsWinner) return aIsWinner ? -1 : 1;
            return a.name.localeCompare(b.name);
        });

        const playerChoicesHtml = players.map(p => {
            const isWinner = p.choice === winningChoice;
            return `<li class="${isWinner ? 'winner' : ''}">
                <div class="player-info">${isWinner ? '👑' : ''}<img src="${p.imageSrc}" class="profile-image-result" alt="${p.name} profile"><span>${p.name}</span></div>
                <div class="player-choice-result" style="background-color: var(--option${p.choice}-color);">'${p.choice === 'A' ? optionA : optionB}' 선택</div>
            </li>`;
        }).join('');
        
        const backButtonHtml = isCurrentRound ? '' : `<button id="back-to-game-btn">게임으로 돌아가기</button>`;

        return `<div id="result-summary">
            <div class="result-header"><h2>${optionA} vs ${optionB}</h2>${backButtonHtml}</div>
            <p class="vote-counts">${votes.A} vs ${votes.B}</p>
            <p class="winner-announcement">${winnerAnnouncementText}</p>
            <ol id="player-choices-list">${playerChoicesHtml}</ol>
        </div>`;
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
        }, 3000);
    }
});