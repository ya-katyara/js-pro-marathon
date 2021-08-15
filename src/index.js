import { io } from 'socket.io-client';
import './index.scss';
import ClientGame from './client/ClientGame';
import { getTime } from './common/util';

const nameForm = document.getElementById('nameForm');
const chatForm = document.getElementById('form');
const chatWindow = document.querySelector('.message');
const socket = io('https://jsprochat.herokuapp.com');
let users = {};

function onSubmitName(evt) {
  evt.preventDefault();

  const chatWrap = document.querySelector('.chat-wrap');
  const nameInput = document.getElementById('name');
  const name = nameInput.value;
  if (name) {
    const startScreen = document.querySelector('.start-game');
    startScreen.remove();
    nameForm.removeEventListener('submit', onSubmitName);

    ClientGame.init({ tagId: 'game', playerName: name });

    chatWrap.style.display = 'block';
    socket.emit('start', name);
  }
}
nameForm.addEventListener('submit', onSubmitName);

chatForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const inputMessage = document.getElementById('input');
  if (inputMessage.value) {
    socket.emit('chat message', inputMessage.value);
    inputMessage.value = '';
  }
});

const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

function formatChatItem(data) {
  const { time, msg } = data;
  const color = users[data.id].color;
  return `<p style="color: #${color};"><strong>${getTime(time)}${data.name ? ` ${data.name}:` : ''}</strong> ${msg}</p>`;
}

socket.on('chat connection', (data) => {
  users = {
    ...users,
    [data.id]: {
      ...data,
      color: randomColor(),
    },
  };
  chatWindow.insertAdjacentHTML('beforeend', formatChatItem(data));
});

socket.on('chat disconnect', (data) => {
  chatWindow.insertAdjacentHTML('beforeend', formatChatItem(data));
});

socket.on('chat message', (data) => {
  chatWindow.insertAdjacentHTML('beforeend', formatChatItem(data));
});

socket.on('chat online', (data) => {
  data.names.forEach((name) => {
    users = {
      ...users,
      [name.id]: {
        color: randomColor(),
      },
    };
  });
  chatWindow.setAttribute('title', `Now online: ${data.online}`);
});
