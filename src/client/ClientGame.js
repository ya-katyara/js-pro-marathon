import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import ClientApi from "./ClientApi";

import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
// import gameObjects from '../configs/gameObjects.json';

const directions = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1],
};

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects: cfg.gameObjects,
      player: null,
      players: {},
      spawnPoint: [],
      api: new ClientApi({
        game: this,
        ...cfg.apiCfg,
      })
    });

    this.api.connect();

    this.engine = this.createEngine();
    this.world = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId), this);
  }

  createWorld() {
    return new ClientWorld(this, this.engine, this.cfg.world);
  }

  getWorld() {
    return this.world;
  }

  initEngine() {
    this.engine.loadSprites(this.cfg.sprites).then(() => {
      this.world.init();
      // eslint-disable-next-line
      this.engine.on('render', (_, time) => {
        this.player && this.engine.camera.focusAtGameObject(this.player);
        this.world.render(time);
      });
      this.engine.start();
      this.initKeys();
      this.engine.focus();
      this.api.join(this.cfg.playerName);
    });
  }

  setPlayers(players) {
    players.forEach(player => this.createPlayer(player));
  }

  createCurrentPlayer(playerCfg) {
    const playerObj = this.createPlayer(playerCfg);

    this.setPlayer(playerObj);
  }

  createPlayer({id, col, row, layer, skin, name}) {
    if (!this.players[id]) {
      const cell = this.world.cellAt(col, row);
      const playerObj = cell.createGameObject({
        'class': 'player',
        type: skin,
        playerId: id,
        playerName: name,
      }, layer);

      cell.addGameObject(playerObj);

      this.players[id] = playerObj;
    }

    return this.players[id];
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => this.moveDirection(keydown, 'left'),
      ArrowRight: (keydown) => this.moveDirection(keydown, 'right'),
      ArrowUp: (keydown) => this.moveDirection(keydown, 'up'),
      ArrowDown: (keydown) => this.moveDirection(keydown, 'down'),
    });
  }

  moveDirection(keydown, direction) {
    if (!keydown) {
      return;
    }
    this.api.move(direction);
    // const { player } = this;
    //
    // if (player && player.motionProgress === 1) {
    //   const canMove = player.moveByCellCoord(
    //     ...directions[direction],
    //     (cell) => cell.findObjectsByType('grass').length,
    //   );
    //
    //   if (canMove) {
    //     player.setState(direction);
    //     player.once('motion-stopped', () => player.setState('main'));
    //   }
    // }
  }

  movePlayerToCell({col, row, id, oldCol, oldRow}) {
    const player = this.getPlayerById(id);

    if (player) {
      const canMove = player.moveToCellCoord(col, row);
      if (canMove) {
        let direction = 'right';
        if (col == oldCol && row > oldRow) {
          direction = 'down';
        } else if (col == oldCol && row < oldRow) {
          direction = 'up';
        } else if (row == oldRow && col > oldCol) {
          direction = 'right';
        } else if (row == oldRow && col < oldCol) {
          direction = 'left';
        }
        player.setState(direction);
        player.once('motion-stopped', () => player.setState('main'));
      }
    }
  }

  getPlayerById(id) {
    return this.players[id];
  }

  addSpawnPoint(spawnPoint) {
    this.spawnPoint.push(spawnPoint);
  }

  removePlayerById(id) {
    const player = this.getPlayerById(id);
    if (player) {
      player.detouch();
      delete this.players[id];
    }
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
      // eslint-disable-next-line
      console.log('Game INIT');
    }
  }
}

export default ClientGame;
