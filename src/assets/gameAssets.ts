import { SpritesheetData, Texture } from "pixi.js";

type AssetType = "spritesheet" | "font";

export interface Asset {
  type: AssetType;
  isLazy?: boolean;
  isLoaded?: boolean;
}

export type AssetSpritesheet = Asset & {
  type: "spritesheet";
  imageUrl: string;
  jsonData: SpritesheetData;
  baseTexture?: Texture;
  textures?: Record<keyof SpritesheetData['frames'], Texture>;
};

export type AssetFont = Asset & {
  type: "font";
  family: string;
  weight: string;
  fontUrl: string;
};

export interface GameAssets {
  graphics: AssetSpritesheet;
  font: AssetFont;
}
