import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';

import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    });

    this.engine = this.createEngine();
    this.world = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init();
      // eslint-disable-next-line
      this.engine.on('render', (_, time) => {
        this.world.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => {
        if (keydown) {
          this.moveDirection('Left');
        }
      },
      ArrowRight: (keydown) => {
        if (keydown) {
          this.moveDirection('Right');
        }
      },
      ArrowUp: (keydown) => {
        if (keydown) {
          this.moveDirection('Up');
        }
      },
      ArrowDown: (keydown) => {
        if (keydown) {
          this.moveDirection('Down');
        }
      }
    })
  }

  directions = {
    Left: [-1, 0],
    Right: [1, 0],
    Up: [0, -1],
    Down: [0, 1],
  };

  moveDirection(direction) {
    this.player.moveByCellCoord(...this.directions[direction], (cell) => {
      return cell.findObjectsByType('grass').length;
    });
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
