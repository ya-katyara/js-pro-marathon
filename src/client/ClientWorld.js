class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
      spriteW: 30,
      spriteH: 30,
    });
  }

  init() {
    const { map } = this.levelCfg;
    map.forEach((cfgRow, y) => {
      cfgRow.forEach((cfgCell, x) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', cfgCell[0]],
          frame: 0,
          x: x * this.spriteW,
          y: y * this.spriteH,
          w: this.spriteW,
          h: this.spriteH,
        });
      });
    });
  }
}

export default ClientWorld;
