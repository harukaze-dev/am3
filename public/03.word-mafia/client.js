document.addEventListener('DOMContentLoaded', () => {
    const socket = io('/word-mafia');

    let myRoomCode = '';
    let myPlayerId = '';
    let myProfileImageSrc = document.getElementById('lobby-profile-preview').src;
    let currentGameState = null;

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (target.id === 'lobby-profile-preview') document.getElementById('lobby-profile-input').click();
        if (target.id === 'create-room-btn') handleCreateRoom();
        if (target.id === 'join-room-btn') handleJoinRoom();
        if (target.id === 'copy-code-btn') navigator.clipboard.writeText(myRoomCode).then(() => showToast('초대 코드가 복사되었습니다!'));
        if (target.id === 'start-game-btn') socket.emit('startGame', { roomCode: myRoomCode });
        if (target.id === 'reveal-votes-btn') socket.emit('revealVotes', { roomCode: myRoomCode });
        if (target.id === 'next-round-btn') socket.emit('nextRound', { roomCode: myRoomCode });
        
        if (target.id === 'final-guess-btn') {
            const guessWord = document.getElementById('final-guess-input').value;
            if (!guessWord.trim()) return alert('단어를 입력해주세요!');
            socket.emit('finalGuess', { roomCode: myRoomCode, guessWord });
        }
        
        const voteAction = target.closest('.vote-button, .cancel-vote-button');
        if (voteAction) {
            const targetId = voteAction.classList.contains('vote-button') ? voteAction.dataset.playerId : null;
            socket.emit('vote', { roomCode: myRoomCode, targetId });
        }
    });

    document.getElementById('game-main-content').addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && event.target.id === 'final-guess-input') {
            const guessWord = event.target.value;
            if (!guessWord.trim()) return alert('단어를 입력해주세요!');
            socket.emit('finalGuess', { roomCode: myRoomCode, guessWord });
        }
    });

    document.getElementById('player-name-input').addEventListener('input', (e) => {
        document.getElementById('room-actions').classList.toggle('hidden', !e.target.value.trim());
    });
    document.getElementById('lobby-profile-input').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => { myProfileImageSrc = ev.target.result; document.getElementById('lobby-profile-preview').src = myProfileImageSrc; };
            reader.readAsDataURL(file);
        }
    });

    function handleCreateRoom() {
        const playerName = document.getElementById('player-name-input').value.trim();
        if (!playerName) return alert('이름을 입력하세요!');
        socket.emit('createRoom', { playerName, profileImageSrc: myProfileImageSrc });
    }

    function handleJoinRoom() {
        const playerName = document.getElementById('player-name-input').value.trim();
        const roomCode = document.getElementById('room-code-input').value.trim().toUpperCase();
        if (!playerName || !roomCode) return alert('이름과 초대 코드를 모두 입력하세요!');
        socket.emit('joinRoom', { roomCode, playerName, profileImageSrc: myProfileImageSrc });
    }

    socket.on('connect', () => { myPlayerId = socket.id; });
    socket.on('roomCreated', onRoomJoined);
    socket.on('roomJoined', onRoomJoined);
    socket.on('playerJoined', ({ playerName }) => showToast(`${playerName} 님이 입장했습니다.`, 'join'));
    socket.on('error', ({ message }) => alert(message));
    socket.on('updateGameState', (gameState) => {
        currentGameState = gameState;
        renderGame(gameState);
    });

    function onRoomJoined({ roomCode }) {
        myRoomCode = roomCode;
        document.body.classList.remove('in-lobby');
        document.getElementById('lobby-container').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
    }
    
    function renderGame(gameState) {
        const players = Object.values(gameState.players);
        const me = gameState.players[myPlayerId];
        if (!me) return;

        document.getElementById('player-count-display').textContent = `참가 인원: ${players.length} / 12`;
        
        const controlsArea = document.getElementById('game-controls-area');
        const setupPhase = document.getElementById('setup-phase');
        const votingPhase = document.getElementById('voting-phase');
        const resultPhase = document.getElementById('result-phase');
        const gameBoard = document.getElementById('game-board');
        const finalGuessDisplay = document.getElementById('final-guess-display');
        const resultDisplay = document.getElementById('result-display');
        
        [gameBoard, finalGuessDisplay, resultDisplay].forEach(el => el.classList.add('hidden'));

        if (me.isHost) {
            controlsArea.classList.remove('hidden');
            [setupPhase, votingPhase, resultPhase].forEach(el => el.classList.add('hidden'));
            
            if (gameState.state === 'waiting') {
                setupPhase.classList.remove('hidden');
            } else if (gameState.state === 'voting') {
                votingPhase.classList.remove('hidden');
                const revealButton = document.getElementById('reveal-votes-btn');
                const livingPlayers = players.filter(p => gameState.participants.includes(p.id) && !p.isDead);
                const allVoted = livingPlayers.length > 0 && livingPlayers.every(p => p.votedFor !== null);
                revealButton.disabled = !allVoted;
            } else if (gameState.state === 'result') {
                resultPhase.classList.remove('hidden');
            }
        } else {
            controlsArea.classList.add('hidden');
        }
        
        // --- [수정됨] ---
        // mainTopic을 표시하는 로직을 제거하고, 항상 '워드 마피아'를 표시하도록 합니다.
        document.getElementById('main-topic-display').textContent = '워드 마피아';
        // ---------------
        
        switch (gameState.state) {
            case 'waiting':
            case 'voting':
                gameBoard.classList.remove('hidden');
                gameBoard.innerHTML = '';
                players.forEach(p => gameBoard.appendChild(createPlayerCard(p, me, gameState)));
                break;
            case 'finalGuess':
                finalGuessDisplay.classList.remove('hidden');
                renderFinalGuess(gameState, me);
                break;
            case 'result':
                resultDisplay.classList.remove('hidden');
                renderResultScreen(gameState);
                break;
        }
    }

    function createPlayerCard(player, me, gameState) {
        const card = document.createElement('div');
        card.className = `player-card ${player.isDead ? 'dead' : ''} ${player.submitted ? 'submitted' : ''}`;
        card.style.borderColor = player.color;
        card.style.setProperty('--tint-color', `${player.color}20`);

        let actionHtml = '';
        const isParticipant = gameState.participants.includes(me.id);
        if (gameState.state === 'voting' && isParticipant && !me.isDead && !player.isDead) {
            if (player.id !== me.id) {
                if (me.votedFor === player.id) {
                    actionHtml = `<button class="cancel-vote-button" data-player-id="${player.id}">투표 취소</button>`;
                } else {
                    actionHtml = `<button class="vote-button" data-player-id="${player.id}" ${me.votedFor ? 'disabled' : ''}>투표</button>`;
                }
            }
        }
        
        let wordHtml = '';
        if (player.id === myPlayerId && player.word) {
            wordHtml = `<span class="my-word-display">${player.word}</span>`;
        }

        card.innerHTML = `
            <div class="profile-section"><img src="${player.imageSrc}" class="profile-image-preview" alt="${player.name} profile"></div>
            <div class="content-section">
                <div class="player-name-wrapper">
                    <div class="player-name">${player.name} ${player.isHost ? '👑' : ''}</div>
                </div>
                ${wordHtml}
                <div class="player-action-area">${actionHtml}</div>
            </div>`;
        return card;
    }

    function renderFinalGuess(gameState, me) {
        const finalGuessDisplay = document.getElementById('final-guess-display');
        const mafia = gameState.players[gameState.votedOutPlayerId];
        
        const votedPlayersHtml = Object.values(gameState.players)
            .filter(p => gameState.participants.includes(p.id) && !p.isDead)
            .sort((a,b) => (gameState.votes[b.id] || 0) - (gameState.votes[a.id] || 0))
            .map(player => {
                const voteCount = gameState.votes[player.id] || 0;
                return `<li class="vote-result-player-card ${player.id === mafia.id ? 'most-voted' : ''}">
                            <div class="player-info">
                                <img src="${player.imageSrc}" alt="${player.name}">
                                <span class="name">${player.name}</span>
                            </div>
                            <span class="vote-count">${voteCount}표</span>
                        </li>`;
            }).join('');

        let contentHtml;
        const message = `최다 득표자 <span class="highlight">${mafia.name}</span>님은 마피아가 맞았습니다!`;

        let guessFormHtml = '';
        if (me.id === mafia.id) {
            guessFormHtml = `
                <div id="final-guess-form">
                    <input type="text" id="final-guess-input" placeholder="시민 단어 추측...">
                    <button id="final-guess-btn" class="control-btn">제출</button>
                </div>`;
        }

        contentHtml = `
            <h2>최후의 발언</h2>
            <p>${message}<br>${me.id === mafia.id ? '시민들의 단어를 맞추면 승리할 수 있습니다!' : '과연 시민들의 단어를 맞출 수 있을까요?'}</p>
            ${guessFormHtml}
            <ul id="vote-result-players">${votedPlayersHtml}</ul>
            `;
        
        finalGuessDisplay.innerHTML = contentHtml;
    }

    function renderResultScreen(gameState) {
        const { winner, votedOutPlayerId, finalGuess } = gameState.roundResult;
        const resultDisplay = document.getElementById('result-display');
        const allPlayers = Object.values(gameState.players);
        const mafia = allPlayers.find(p => p.isMafia);
        let titleClass, titleText, detailsText = '';

        if (winner === 'citizen') {
            titleClass = 'citizen-win';
            titleText = '시민 승리!';
            detailsText = `마피아의 답변: <span class="highlight guess">${finalGuess || "없음"}</span>`;
        } else {
            titleClass = 'mafia-win';
            titleText = '마피아 승리!';
            if (finalGuess) {
                detailsText = `마피아의 답변: <span class="highlight citizen">${finalGuess}</span>`;
            } else {
                 const votedPlayer = gameState.players[votedOutPlayerId];
                 detailsText = votedPlayer ? 
                    `최다 득표자 <span class="highlight">${votedPlayer.name}</span>님은 시민이었습니다...` : 
                    `투표가 무효 처리되어 마피아가 승리했습니다!`;
            }
        }
        
        const sortedPlayers = [...allPlayers].sort((a, b) => {
            const aIsWinner = ((winner === 'citizen' && !a.isMafia) || (winner === 'mafia' && a.isMafia));
            const bIsWinner = ((winner === 'citizen' && !b.isMafia) || (winner === 'mafia' && b.isMafia));
            if (aIsWinner && !bIsWinner) return -1;
            if (!aIsWinner && bIsWinner) return 1;
            return 0;
        });

        const playersHtml = sortedPlayers.map(p => {
            const isWinner = ((winner === 'citizen' && !p.isMafia) || (winner === 'mafia' && p.isMafia));
            const wordClass = p.isMafia ? 'mafia' : 'citizen';
            const voteCount = gameState.votes[p.id] || 0;
            const voteHtml = voteCount > 0 ? `<span class="vote-count">(${voteCount}표)</span>` : '';

            return `<li class="result-player-card ${isWinner ? 'winner' : ''}">
                        <div class="player-info">
                            <img src="${p.imageSrc}" alt="${p.name}">
                            <div class="name">${p.name}</div>
                        </div>
                        <div class="result-details-wrapper">
                            ${voteHtml}
                            <div class="role ${wordClass}">${p.word}</div>
                        </div>
                    </li>`;
        }).join('');

        resultDisplay.innerHTML = `
            <h2 class="result-title ${titleClass}">${titleText}</h2>
            <p class="result-details">${detailsText}</p>
            <div class="word-reveal-box">
                <div class="word-reveal-item">
                    <p>시민 단어</p>
                    <span class="word citizen">${gameState.citizenWord}</span>
                </div>
                <div class="word-reveal-item">
                    <p>마피아 단어</p>
                    <span class="word mafia">${mafia.word}</span>
                </div>
            </div>
            <ul id="result-players-container">${playersHtml}</ul>
            `;
        resultDisplay.classList.remove('hidden');
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.getElementById('toast-container').appendChild(toast);
        setTimeout(() => { toast.classList.add('fade-out'); setTimeout(() => toast.remove(), 500) }, 3000);
    }
});