import { AnimatedBall } from "./animatedBall";
import { randomIntInRange } from "./util";

export class BallFactory {
  private readonly colors = [
    "#264653",
    "#2a9d8f",
    "#e9c46a",
    "#f4a261",
    "#e76f51",
  ];

  constructor(
    private ctx: CanvasRenderingContext2D,
    private minRadius = 8,
    private maxRadius = 20,
    private gravity = 0.2,
    private friction = 0.98
  ) {}

  createRandomBall(): AnimatedBall {
    const radius = randomIntInRange(this.minRadius, this.maxRadius);
    const x = randomIntInRange(radius, this.ctx.canvas.width - radius);
    const y = randomIntInRange(radius, this.ctx.canvas.height - radius);
    const dx = randomIntInRange(-3, 3);
    const dy = randomIntInRange(-2, 2);
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];

    return new AnimatedBall(
      x,
      y,
      dx,
      dy,
      radius,
      color,
      this.minRadius,
      this.maxRadius,
      this.ctx,
      this.gravity,
      this.friction
    );
  }
}
