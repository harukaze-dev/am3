// public/js/nav.js

// 모든 게임 목록을 여기에서 관리합니다.
const games = [
    { name: 'XX평', path: '/01.average-game' },
    { name: '소수결 게임', path: '/02.minority-game' },
    { name: '워드 마피아', path: '/03.word-mafia' },
    { name: '순발력 게임', path: '/04.grid-game' },
    { name: 'LED 게임', path: '/05.led-game' },
    { name: '문장퍼즐게임', path: '/06.text-game' },
    { name: '양세찬게임', path: '/07.indian-poker' },
    { name: '포켓몬게임', path: '/08.pokemon-game' } // [추가] 포켓몬게임
];

const currentPagePath = window.location.pathname;

function createNavBar() {
    const navBar = document.createElement('nav');
    navBar.className = 'game-nav';

    const homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.className = 'nav-home-button';
    homeLink.innerHTML = '🏠 홈으로';
    
    const navLinksContainer = document.createElement('div');
    navLinksContainer.className = 'nav-links';

    games.forEach(game => {
        const gameLink = document.createElement('a');
        gameLink.href = game.path;
        gameLink.className = 'nav-link';
        gameLink.textContent = game.name;

        if (game.path === currentPagePath) {
            gameLink.classList.add('active');
        }
        navLinksContainer.appendChild(gameLink);
    });

    const hamburgerButton = document.createElement('button');
    hamburgerButton.className = 'nav-hamburger';
    hamburgerButton.innerHTML = '☰';

    navBar.appendChild(homeLink);
    navBar.appendChild(navLinksContainer);
    navBar.appendChild(hamburgerButton);

    document.body.prepend(navBar);

    hamburgerButton.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });
}

document.addEventListener('DOMContentLoaded', createNavBar);