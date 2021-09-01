import {io} from 'socket.io-client';
import ClientChat from "./ClientChat";

class ClientApi {
    constructor(cfg) {
        Object.assign(
            this, {
                ...cfg,
                game: cfg.game,
            });
    }

    connect() {
        const { url, path } = this;

        this.io = io(url, {
            path
        });
        this.io.on('welcome', this.onWelcome);
        this.io.on('join', this.onJoin.bind(this));
        this.io.on('newPlayer', this.onNewPlayer.bind(this));
        this.io.on('playerMove', this.onPlayerMove.bind(this));
        this.io.on('playerDisconnect', this.onPlayerDisconnect.bind(this));

        this.io.on('chat connection', this.onChatConnection.bind(this));
        this.io.on('chat disconnect', this.onChatDisconnect.bind(this));
        this.io.on('chat message', this.onChatMessage.bind(this));
        this.io.on('chat online', this.onChatOnline.bind(this));

        this.clientChat = new ClientChat({
            chatElement: this.chatElement,
            api: this,
        });
    }

    onWelcome(serverStatus) {
        console.log("Server is online ", serverStatus);
    }

    onJoin(response) {
        this.game.createCurrentPlayer(response.player);
        this.game.setPlayers(response.playersList);
        console.log("Joined", response);
    }

    join(playerName) {
        this.io.emit('join', playerName);
        this.io.emit('start', playerName);
    }

    move(dir) {
        this.io.emit('move', dir);
    }

    message(msg) {
        this.io.emit('chat message', msg);
    }

    onNewPlayer(player) {
        this.game.createPlayer(player);
    }

    onPlayerMove(moveCfg) {
        const {game} = this;
        game.movePlayerToCell(moveCfg);
    }

    onPlayerDisconnect(id) {
        this.game.removePlayerById(id);
    }

    onChatConnection(data) {
        this.clientChat.connectPlayer(data);
    }

    onChatDisconnect(data) {
        this.clientChat.displayMessage(data);
    }

    onChatMessage(data) {
        this.clientChat.displayMessage(data);
    }

    onChatOnline(data) {
        this.clientChat.showOnlineCount(data);
    }
}

export default ClientApi;