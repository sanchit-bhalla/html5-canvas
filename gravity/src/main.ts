import { BallFactory } from "./ballFactory";
import "./style.css";

const canvas = document.querySelector("canvas")!; // `!` or  `as HTMLCanvasElement`;
const ctx = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.style.backgroundColor = "#000";

const ballFactory = new BallFactory(ctx);

let balls: ReturnType<BallFactory["createRandomBall"]>[] = [];

function init() {
  balls = [];
  for (let i = 0; i < 500; i++) {
    balls.push(ballFactory.createRandomBall());
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  balls.forEach((animatedBall) => animatedBall.update());
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

window.addEventListener("click", function () {
  init();
});

init();
animate();
