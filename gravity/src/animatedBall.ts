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
    private ctx: CanvasRenderingContext2D
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
    // if (this.x + this.radius > innerWidth || this.x - this.radius < 0) this.dx *= -1;
    // if (this.y + this.radius > innerHeight || this.y - this.radius < 0) this.dy *= -1;

    // this.x += this.dx;
    // this.y += this.dy;

    // if (
    //   mouse.x !== undefined &&
    //   mouse.y !== undefined &&
    //   Math.abs(mouse.x - this.x) < 50 &&
    //   Math.abs(mouse.y - this.y) < 50 &&
    //   this.radius < 40
    // ) {
    //   this.radius += 1;
    // } else if (this.radius > this.minRadius) {
    //   this.radius -= 1;
    // }

    // if(this.y + this.radius + this.dy >= this.ctx.canvas.height)
    this.y += this.dy;
    this.draw();
  }
}
