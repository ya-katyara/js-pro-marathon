import './index.scss';
import CharWalk from './assets/Female-5-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const canvasBg = document.getElementById('game_bg');
const ctxBg = canvasBg.getContext('2d');

const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;
let bottomPressed = false;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let pY = canvas.offsetHeight / 2 - spriteH / 2;
let pX = canvas.offsetWidth / 2 - spriteW / 2;
let direction = 0;

const handleKeyDown = (e) => {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPressed = true;
  } else if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  } else if (e.key === 'Up' || e.key === 'ArrowUp') {
    upPressed = true;
  }
};

const handleKeyUp = (e) => {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPressed = false;
  } else if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  } else if (e.key === 'Up' || e.key === 'ArrowUp') {
    upPressed = false;
  }
};

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

const img = document.createElement('img');
img.src = CharWalk;

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPressed) {
      if (pY < canvas.offsetHeight - spriteH) {
        pY += 10;
        direction = 0;
      }
      cycle = (cycle + 1) % shots;
    } else if (rightPressed) {
      if (pX < canvas.offsetWidth - spriteW) {
        pX += 10;
        direction = 2;
      }
      cycle = (cycle + 1) % shots;
    } else if (leftPressed) {
      if (pX > 0) {
        pX -= 10;
        direction = 1;
      }
      cycle = (cycle + 1) % shots;
    } else if (upPressed) {
      if (pY > 0) {
        pY -= 10;
        direction = 3;
      }
      cycle = (cycle + 1) % shots;
    }
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    ctx.drawImage(img, cycle * spriteW, direction * spriteH, spriteW, spriteH, pX, pY, 48, 48);
  }, 120);
});

// draw background (grass and a path)
ctxBg.fillStyle = 'green';
ctxBg.rect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
ctxBg.fill();

ctxBg.stokeStyle = '#b16161';
ctxBg.lineWidth = 2;
ctxBg.beginPath();
ctxBg.moveTo(0, 0);
ctxBg.lineTo(10, 10);
ctxBg.lineTo(100, 10);
ctxBg.lineTo(350, 20);
ctxBg.quadraticCurveTo(470, 30, 400, 200);
ctxBg.bezierCurveTo(370, 250, 320, 500, 420, 520);
ctxBg.lineTo(600, 530);
ctxBg.stroke();

const roadW = 40;
ctxBg.beginPath();
ctxBg.moveTo(0, roadW);
ctxBg.lineTo(10, 10 + roadW);
ctxBg.lineTo(100, 10 + roadW);
ctxBg.lineTo(350, 20 + roadW);
ctxBg.quadraticCurveTo(470 - roadW, 30 + roadW, 390 - roadW, 200 + roadW);
ctxBg.bezierCurveTo(370 - roadW, 250 - roadW, 320 - roadW, 500 + roadW, 420, 520 + roadW);
ctxBg.lineTo(600, 530 + roadW);
ctxBg.stroke();
