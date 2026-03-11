import { AssetTextures } from "assets/AssetTextures";
import { Sprite, Texture } from "pixi.js";
import { REEL_SYMBOLS, ReelSymbolType } from "types/reelSymbolType";

export class ReelSymbol extends Sprite {
  assets: AssetTextures;
  currentSymbolType: ReelSymbolType | "none";

  constructor(assets: AssetTextures, reelSymbol: ReelSymbolType) {
    super();
    this.currentSymbolType = "none";
    this.assets = assets;
    this.anchor.set(0.5, 0.5);
    this.zIndex = 10;
    this.switchType(reelSymbol);
  }

  static getRandomSymbolType(): ReelSymbolType {
    const i = Math.floor(Math.random() * REEL_SYMBOLS.length);
    return REEL_SYMBOLS[i];
  }

  getTextureByType(type: ReelSymbolType): Texture {
    switch (type) {
      case "bar":
        return this.assets.bar;
      case "bell":
        return this.assets.bell;
      case "cherry":
        return this.assets.cherry;
      case "diamond":
        return this.assets.diamond;
      case "lemon":
        return this.assets.lemon;
      case "plum":
        return this.assets.plum;
      case "seven":
        return this.assets.seven;
      case "wild":
        return this.assets.wild;
    }
  }

  switchType(type: ReelSymbolType) {
    if (this.currentSymbolType != type) {
      this.texture = this.getTextureByType(type);
      this.currentSymbolType = type;
    }
  }
}
