import { Application, Container, Sprite, Texture } from "pixi.js";

export class Button extends Sprite {
  private isDisabled: boolean;
  private onClick: () => void;

  constructor(texture: Texture, onClick: () => void) {
    super(texture);
    this.onClick = onClick;
    this.isDisabled = false;

    this.eventMode = "static";
    this.cursor = "pointer";
    this.on("pointerdown", () => this.trigger());
    this.on("tap", () => this.trigger());
    this.anchor.set(0.5, 0.5);
    this.enable();
  }

  trigger() {
    if (!this.isDisabled) {
      this.onClick();
    }
  }

  update(delta: number) {
    if (this.isDisabled && this.alpha > 0.5) {
      this.alpha = Math.max(this.alpha - delta, 0.5);
    }
    if (!this.isDisabled && this.alpha < 1.0) {
      this.alpha = Math.min(this.alpha + delta, 1.0);
    }
  }

  disable() {
    this.isDisabled = true;
    this.cursor = "default";
  }

  enable() {
    this.isDisabled = false;
    this.cursor = "pointer";
  }
}
