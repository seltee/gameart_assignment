import { Container, DestroyOptions, Sprite, Texture } from "pixi.js";
import { GameText } from "./GameText";

export class NumberBox extends Container {
  backgroundSprite: Sprite;
  text: GameText;

  constructor(texture: Texture, value: number) {
    super();

    const backgroundSprite = new Sprite(texture);
    backgroundSprite.anchor.set(0.5, 0.5);
    this.addChild(backgroundSprite);
    this.backgroundSprite = backgroundSprite;

    const text = new GameText(`${value}`, 128, 0xffffff);
    text.anchor.set(0.5, 0.5);
    text.y = 40;
    this.addChild(text);
    this.text = text;
  }

  set(value: number) {
    this.text.text = `${value}`;
  }

  destroy(): void {
    super.destroy();
    this.backgroundSprite.destroy();
    this.text.destroy();
  }
}
