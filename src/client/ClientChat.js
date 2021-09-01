import {getTime} from "../common/util";

export default class ClientChat {
    constructor(cfg) {
        Object.assign(
            this, {
                ...cfg,
                api: cfg.api,
            });

        const chatForm = this.chatElement.querySelector('form');
        chatForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const inputMessage = document.getElementById('input');
            if (inputMessage.value) {
                this.api.message(inputMessage.value);
                inputMessage.value = '';
            }
        });

        this.chatWindow = this.chatElement.querySelector('.message');
    }
    users = {};

    displayMessage(data) {
        this.chatWindow.insertAdjacentHTML('beforeend', this.formatChatItem(data));
    }

    connectPlayer(data) {
        this.users = {
            ...this.users,
            [data.id]: {
                ...data,
                color: randomColor(),
            },
        };
        this.displayMessage(data);
    }

    showOnlineCount(data) {
        data.names.forEach((name) => {
            this.users = {
                ...this.users,
                [name.id]: {
                    color: randomColor(),
                },
            };
        });
        this.chatWindow.setAttribute('title', `Now online: ${data.online}`);
    }

    formatChatItem(data) {
        const {time, msg} = data;
        const color = this.users[data.id].color;
        return `<p style="color: #${color};"><strong>${getTime(time)}${
            data.name ? ` ${data.name}:` : ''
        }</strong> ${msg}</p>`;
    }
}

const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);