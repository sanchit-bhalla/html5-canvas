const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.style.backgroundColor = "#000";

const mouse = {
  x: undefined,
  y: undefined,
};

// const colors = ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"];
const colors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];

const circleArr = [];
const maxRadius = 40;
const minRadius = 3;

// Resize canvas on resizing browser
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

window.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

class AnimatedCircle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = Math.random() * minRadius + 1; // [1, minRadius+1)
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = this.color;
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
      this.dx = -this.dx;

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
      this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    // increase size of circles in the viscinity of the the mouse(cursor)
    if (
      Math.abs(mouse.x - this.x) < 50 &&
      Math.abs(mouse.y - this.y) < 50 &&
      this.radius < maxRadius
    )
      this.radius += 1;
    else if (this.radius > this.minRadius) this.radius -= 1;

    this.draw();
  }
}

function init() {
  circleArr.length = 0;
  for (let i = 0; i < 800; i++) {
    let radius = Math.random() * 5 + minRadius;
    // convert Math.random i.e [0, 1) into [radius, innerWidth - radius)
    let x = Math.random() * (innerWidth - 2 * radius) + radius;
    let y = Math.random() * (innerHeight - 2 * radius) + radius;
    let dx = Math.random() - 0.5;
    let dy = Math.random() - 0.5;
    circleArr.push(new AnimatedCircle(x, y, dx, dy, radius));
  }
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  circleArr.forEach((circle) => circle.update());
  requestAnimationFrame(animate);
}

init();
animate();
