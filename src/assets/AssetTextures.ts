import { Texture } from "pixi.js";
import { GameAssets } from "./gameAssets";
import { assert } from "utils/assert";

export class AssetTextures {
  assets: GameAssets;
  bar: Texture;
  bell: Texture;
  betField: Texture;
  cherry: Texture;
  diamond: Texture;
  lemon: Texture;
  plum: Texture;
  reelFrame: Texture;
  reelSeperator: Texture;
  seven: Texture;
  spinButton: Texture;
  wild: Texture;
  winField: Texture;

  constructor(assets: GameAssets) {
    this.assets = assets;
    const textures = assert(assets.graphics.textures, "Textures missing");

    this.bar = assert(textures["Bar.png"], "No bar texture!");
    this.bell = assert(textures["Bell.png"], "No bell texture!");
    this.betField = assert(textures["BetField.png"], "No bet field texture!");
    this.cherry = assert(textures["Cherry.png"], "No cherry texture!");
    this.diamond = assert(textures["Diamond.png"], "No diamond texture!");
    this.lemon = assert(textures["Lemon.png"], "No lemon texture!");
    this.plum = assert(textures["Plum.png"], "No plum texture!");
    this.reelFrame = assert(
      textures["ReelFrame.png"],
      "No reel frame texture!",
    );
    this.reelSeperator = assert(
      textures["ReelSeperator.png"],
      "No reel separator texture!",
    );
    this.seven = assert(textures["Seven.png"], "No seven texture!");
    this.spinButton = assert(
      textures["SpinButton.png"],
      "No spin button texture!",
    );
    this.wild = assert(textures["Wild.png"], "No wild texture!");
    this.winField = assert(textures["WinField.png"], "No win field texture!");
  }
}
