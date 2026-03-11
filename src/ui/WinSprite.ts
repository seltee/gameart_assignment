import { Text } from "pixi.js";
import { GameText } from "./GameText";

export class WinSprite extends GameText {
  life: number;
  timeRotation: number;
  shiftX: number;
  shiftY: number;

  constructor() {
    super("WIN", 64, 0xe69b00);
    this.anchor.set(0.5, 0.5);
    this.life = Math.random() + 1;
    this.timeRotation = (Math.random() - 0.5) * 4;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 800 + 100;
    this.shiftX = Math.sin(angle) * speed;
    this.shiftY = Math.cos(angle) * speed;
  }

  update(delta: number): boolean {
    this.life -= delta;
    if (this.life < 0) {
      if (!this.destroyed) {
        this.destroy();
      }
      return false;
    }
    this.alpha = Math.min(this.life, 1);
    this.rotation += this.timeRotation * delta;
    this.x += this.shiftX * delta;
    this.y += this.shiftY * delta;
    return true;
  }
}
