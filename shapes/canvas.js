const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

// Resize Canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Rectangle
// ctx.fillRect(x, x, width, height)
ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
ctx.fillRect(100, 100, 100, 100);
ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
ctx.fillRect(200, 200, 200, 100);
ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
ctx.fillRect(400, 300, 200, 100);

// Line
ctx.beginPath();
ctx.moveTo(100, 300);
ctx.lineTo(300, 100);
ctx.lineTo(400, 200);
ctx.strokeStyle = "#fa34a3";
ctx.stroke();

// Arc / Circle
ctx.beginPath();
ctx.arc(250, 250, 50, 0, Math.PI * 2, false);
ctx.strokeStyle = "blue";
ctx.stroke();

ctx.beginPath();
ctx.arc(350, 250, 50, 0, Math.PI * 2);
ctx.stroke();

// Random circles
for (let i = 0; i < 50; i++) {
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2);
  ctx.strokeStyle = "cyan";
  ctx.stroke();
}
