import './index.scss';
import ClientGame from './client/ClientGame';

window.addEventListener('load', async () => {
    const world = await fetch('https://jsmarathonpro.herokuapp.com/api/v1/world').then(res => res.json());
    const sprites = await fetch('https://jsmarathonpro.herokuapp.com/api/v1/sprites').then(res => res.json());
    const gameObjects = await fetch('https://jsmarathonpro.herokuapp.com/api/v1/gameObjects').then(res => res.json());

    const startGame = document.querySelector('.start-game');
    const nameForm = document.getElementById('nameForm');

    startGame.style.display = 'flex';
    function onSubmitName(evt) {
        evt.preventDefault();

        const chatWrap = document.querySelector('.chat-wrap');
        const nameInput = document.getElementById('name');
        const name = nameInput.value;
        if (name) {
            const startScreen = document.querySelector('.start-game');
            startScreen.remove();
            nameForm.removeEventListener('submit', onSubmitName);

            ClientGame.init({
                tagId: 'game',
                playerName: name,
                world,
                sprites,
                gameObjects,
                apiCfg: {
                    chatElement: chatWrap,
                    url: 'https://jsmarathonpro.herokuapp.com/',
                    path: '/game'
                }
            });

            chatWrap.style.display = 'block';
        }
    }

    nameForm.addEventListener('submit', onSubmitName);
})