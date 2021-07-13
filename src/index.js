import './index.scss';
import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  ClientGame.init({ tagId: 'game' });
});

// import CharWalk from './assets/Female-5-Walk.png';
// import terrainAtlas from './assets/terrain.png';
// import worldCfg from './configs/world.json';
// import sprites from './configs/sprites';
//
// const canvas = document.getElementById('game');
// const ctx = canvas.getContext('2d');
//
// const canvasBg = document.getElementById('game_bg');
// const ctxBg = canvasBg.getContext('2d');
//
// const spriteW = 48;
// const spriteH = 48;
// const shots = 3;
// let cycle = 0;
// let keyPressed = null;
// let pY = canvas.offsetHeight / 2 - spriteH / 2;
// let pX = canvas.offsetWidth / 2 - spriteW / 2;
// let direction = 0;
//
// const handleKeyDown = (e) => {
//   keyPressed = e.key;
// };
//
// const handleKeyUp = () => {
//   keyPressed = null;
// };
//
// document.addEventListener('keydown', handleKeyDown);
// document.addEventListener('keyup', handleKeyUp);
//
// const img = document.createElement('img');
// img.src = CharWalk;
//
// const terrain = document.createElement('img');
// terrain.src = terrainAtlas;
//
// // img.addEventListener('load', () => {
// //   window.requestAnimationFrame(drawPlayer);
// // });
//
// terrain.addEventListener('load', () => {
//   const {map} = worldCfg;
//   map.forEach((cfgRow, y) => {
//     cfgRow.forEach((cfgCell, x) => {
//       const [sX, sY, sW, sH] = sprites.terrain[cfgCell[0]].frames[0];
//       ctx.drawImage(terrain, sX, sY, sW, sH, x * spriteW, y * spriteH, spriteW, spriteH);
//     })
//   })
// })
//
// const drawPlayer = (timestamp) => {
//   switch (keyPressed) {
//     case 'Down':
//     case 'ArrowDown':
//       if (pY < canvas.offsetHeight - spriteH) {
//         pY += 10;
//         direction = 0;
//       }
//       cycle = (cycle + 1) % shots;
//       break;
//     case 'Right':
//     case 'ArrowRight':
//       if (pX < canvas.offsetWidth - spriteW) {
//         pX += 10;
//         direction = 2;
//       }
//       cycle = (cycle + 1) % shots;
//       break;
//     case 'Left':
//     case 'ArrowLeft':
//       if (pX > 0) {
//         pX -= 10;
//         direction = 1;
//       }
//       cycle = (cycle + 1) % shots;
//       break;
//     case 'Up':
//     case 'ArrowUp':
//       if (pY > 0) {
//         pY -= 10;
//         direction = 3;
//       }
//       cycle = (cycle + 1) % shots;
//       break;
//   }
//   ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
//   ctx.drawImage(img, cycle * spriteW, direction * spriteH, spriteW, spriteH, pX, pY, 48, 48);
//   window.requestAnimationFrame(drawPlayer);
// }
//
// const drawBackground = () => {
//   ctxBg.fillStyle = 'green';
//   ctxBg.rect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
//   ctxBg.fill();
//
//   ctxBg.stokeStyle = '#b16161';
//   ctxBg.lineWidth = 2;
//   ctxBg.beginPath();
//   ctxBg.moveTo(0, 0);
//   ctxBg.lineTo(10, 10);
//   ctxBg.lineTo(100, 10);
//   ctxBg.lineTo(350, 20);
//   ctxBg.quadraticCurveTo(470, 30, 400, 200);
//   ctxBg.bezierCurveTo(370, 250, 320, 500, 420, 520);
//   ctxBg.lineTo(600, 530);
//   ctxBg.stroke();
//
//   const roadW = 40;
//   ctxBg.beginPath();
//   ctxBg.moveTo(0, roadW);
//   ctxBg.lineTo(10, 10 + roadW);
//   ctxBg.lineTo(100, 10 + roadW);
//   ctxBg.lineTo(350, 20 + roadW);
//   ctxBg.quadraticCurveTo(470 - roadW, 30 + roadW, 390 - roadW, 200 + roadW);
//   ctxBg.bezierCurveTo(370 - roadW, 250 - roadW, 320 - roadW, 500 + roadW, 420, 520 + roadW);
//   ctxBg.lineTo(600, 530 + roadW);
//   ctxBg.stroke();
// }
// // drawBackground();
