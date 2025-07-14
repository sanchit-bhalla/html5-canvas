import type { Ball } from "./types";

export class AnimatedBall implements Ball {
  constructor(
    public x: number,
    public y: number,
    public dx: number,
    public dy: number,
    public radius: number,
    public color: string,
    public minRadius: number,
    public maxRadius: number,
    private ctx: CanvasRenderingContext2D,
    private gravity: number,
    private friction: number
  ) {}

  draw(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  update(): void {
    if (this.y + this.radius + this.dy >= this.ctx.canvas.height) {
      this.dy = -this.dy;
      this.dy = this.dy * this.friction;
      this.dx = this.dx * this.friction;
    } else {
      this.dy += this.gravity; // velocity keeps on increasing simulating gravitational effect
    }

    if (
      this.x + this.radius >= this.ctx.canvas.width ||
      this.x - this.radius <= 0
    )
      this.dx = -this.dx * this.friction;

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}
