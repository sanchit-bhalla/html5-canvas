const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.style.backgroundColor = "#000";

class AnimatedCircle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  create() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = "green";
    ctx.stroke();
  }

  animate() {
    this.create();
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
      this.dx = -this.dx;

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
      this.dy = -this.dy;
  }
}

const circleArr = [];
for (let i = 0; i < 100; i++) {
  let radius = 30;
  // convert Math.random i.e [0, 1) into [radius, innerWidth - radius)
  let x = Math.random() * (innerWidth - 2 * radius) + radius;
  let y = Math.random() * (innerHeight - 2 * radius) + radius;
  let dx = (Math.random() - 0.5) * 6;
  let dy = (Math.random() - 0.5) * 6;
  circleArr.push(new AnimatedCircle(x, y, dx, dy, radius));
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  circleArr.forEach((circle) => circle.animate());
  requestAnimationFrame(animate);
}

animate();
