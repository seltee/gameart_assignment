import { Container, Text } from "pixi.js";
import { WinSprite } from "./WinSprite";
import { UI_WIN_EFFECT_Z_INDEX, UI_WIN_MAIN_Z_INDEX } from "utils/zIndexes";
import { GameText } from "./GameText";

export class Win {
  container: Container;
  winSprites: WinSprite[] = [];
  winAmountText: Text;
  winAmountTextLife = 0;

  constructor(container: Container) {
    this.container = container;
    const winAmountText = new GameText("100", 200, 0xff0000);
    this.winAmountText = winAmountText;
    this.winAmountText.zIndex = UI_WIN_MAIN_Z_INDEX;
    this.winAmountText.anchor.set(0.5, 0.5);
    container.addChild(this.winAmountText);
  }

  trigger(winAmount: number) {
    this.removeAll();
    this.winAmountTextLife = 4;
    this.winAmountText.text = `${winAmount}`;
    for (let i = 0; i < 100; i++) {
      const winSprite = new WinSprite();
      winSprite.zIndex = UI_WIN_EFFECT_Z_INDEX;
      this.container.addChild(winSprite);
      this.winSprites.push(winSprite);
    }
    this.container.sortChildren();
  }

  removeAll() {
    this.winSprites.forEach((winSprite) => winSprite.destroy());
    this.winSprites = [];
  }

  update(delta: number) {
    this.winSprites = this.winSprites.filter((winSprite) =>
      winSprite.update(delta),
    );
    if (this.winAmountTextLife > 0) {
      this.winAmountText.visible = true;
      this.winAmountTextLife = Math.max(this.winAmountTextLife - delta, 0);
      this.winAmountText.alpha = Math.min(this.winAmountTextLife, 1);
      this.winAmountText.rotation = Math.sin(this.winAmountTextLife * 10);
      this.winAmountText.scale.set(
        Math.sin(this.winAmountTextLife * 4) * 0.5 + 1,
        Math.sin(this.winAmountTextLife * 5) * 0.5 + 1,
      );
    } else {
      this.winAmountText.visible = false;
    }
  }
}
