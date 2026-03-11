import { Scene } from "./Scene";
import { Container, Graphics, Sprite } from "pixi.js";
import { AssetTextures } from "assets/AssetTextures";
import { Reel } from "entities/Reel";
import { REEL_FRAME_Z_INDEX, REEL_Z_INDEX } from "utils/zIndexes";
import { gameEvents } from "gameEvents";
import { ReelFullSet } from "types/reelFullSet";

const REEL_X_GAP = 272;
const REEL_X_ADJ_SHIFT = 6;
const REEL_Y_ADJ_SHIFT = 18;
const REEL_MASK_WIDTH = 960;
const REEL_MASK_HEIGHT = 860;
const REEL_DELAY = 0.25;

export class GameScene extends Scene {
  assets: AssetTextures;
  reels: Reel[];
  reelContainer: Container;
  frame: Sprite;
  mask: Graphics;

  constructor(assets: AssetTextures, gameContainer: Container) {
    super();
    this.assets = assets;

    // Contains all reels
    const reelContainer = new Container();
    reelContainer.zIndex = REEL_Z_INDEX;
    gameContainer.addChild(reelContainer);
    this.reelContainer = reelContainer;

    // Mask for reels
    const mask = new Graphics()
      .rect(0, 0, REEL_MASK_WIDTH, REEL_MASK_HEIGHT)
      .fill(0xffffff);
    mask.x = -REEL_MASK_WIDTH / 2;
    mask.y = -REEL_MASK_HEIGHT / 2 - REEL_Y_ADJ_SHIFT;
    reelContainer.mask = mask;
    reelContainer.addChild(mask);
    this.mask = mask;

    // Frame on top of reels
    const frame = new Sprite(assets.reelFrame);
    frame.zIndex = REEL_FRAME_Z_INDEX;
    frame.anchor.set(0.5, 0.5);
    gameContainer.addChild(frame);
    this.frame = frame;

    // Push reel container backward
    gameContainer.sortChildren();
    this.reels = [-REEL_X_GAP, 0, REEL_X_GAP].map((xShift) => {
      const reel = new Reel(assets);
      reel.x = xShift + REEL_X_ADJ_SHIFT;
      reel.y = -REEL_Y_ADJ_SHIFT;
      reelContainer.addChild(reel);
      return reel;
    });

    // Events
    gameEvents.subscribe((event, data) => {
      switch (event) {
        case "startRound":
          this.startRound(data.combination);
      }
    });
  }

  async startRound(combination: ReelFullSet) {
    const promises: Promise<unknown>[] = [];
    this.reels.forEach((reel, i) => {
      promises.push(
        reel.startSpin(i * REEL_DELAY, [
          combination[2][i],
          combination[1][i],
          combination[0][i],
        ]),
      );
    });
    await Promise.all(promises);
    gameEvents.emit("reelsStopped", null);
  }

  update(delta: number) {
    this.reels.forEach((reel) => reel.update(delta));
  }

  destroy(): void {}
}
