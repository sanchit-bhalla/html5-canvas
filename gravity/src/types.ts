// types.ts
export interface MousePosition {
  x: number | undefined;
  y: number | undefined;
}

export interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  minRadius: number;
  maxRadius: number;
  color: string;
  draw(): void;
  update(mouse: MousePosition): void;
}
