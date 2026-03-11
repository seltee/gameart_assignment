import { Assets, Spritesheet } from "pixi.js";
import { Asset, GameAssets, AssetSpritesheet, AssetFont } from "./gameAssets";
import { injectFont } from "utils/injectFonts";

export class AssetsLoader {
  gameAssets: GameAssets;
  constructor(gameAssets: GameAssets) {
    this.gameAssets = gameAssets;
  }

  loadAll(progressCallback: (progress: number) => void) {
    return new Promise(async (resolve) => {
      const promiseList: Promise<void>[] = [];

      const keys = Object.keys(this.gameAssets) as (keyof GameAssets)[];
      keys.forEach((key) => {
        const data = this.gameAssets[key];
        promiseList.push(this.loadAsset(data));
      });

      // fake loading for nice bar progression
      for (let i = 0; i < 10; i++) {
        promiseList.push(
          new Promise((resolve) => {
            setTimeout(() => resolve(), i * 120);
          }),
        );
      }

      const total = promiseList.length;
      let loaded = 0;
      promiseList.forEach((promise) => {
        promise.then(() => {
          loaded++;
          const ratio = loaded / total;
          progressCallback(ratio);
        });
      });

      await Promise.all(promiseList);
      resolve(true);
    });
  }

  loadAsset(gameAsset: Asset): Promise<void> {
    return new Promise(async (resolve, _reject) => {
      if (gameAsset.type == "spritesheet") {
        const assetSpritesheet = gameAsset as AssetSpritesheet;
        assetSpritesheet.isLoaded = false;
        const texture = await Assets.load(assetSpritesheet.imageUrl);
        assetSpritesheet.isLoaded = true;
        assetSpritesheet.baseTexture = texture;

        const sheet = new Spritesheet(texture, assetSpritesheet.jsonData);
        await sheet.parse(); // generates textures

        // Fix padding to avoid artifacts
        // Free version of TexturePacker doesn't allow to set padding between images
        Object.keys(sheet.textures).forEach((key) => {
          const texture = sheet.textures[key];
          const UV_SHIFT = 0.007;
          texture.uvs.x0 += UV_SHIFT;
          texture.uvs.x1 -= UV_SHIFT;
          texture.uvs.x2 -= UV_SHIFT;
          texture.uvs.x3 += UV_SHIFT;
          texture.uvs.y0 += UV_SHIFT;
          texture.uvs.y1 += UV_SHIFT;
          texture.uvs.y2 -= UV_SHIFT;
          texture.uvs.y3 -= UV_SHIFT;
        });
        assetSpritesheet.textures = sheet.textures;

        resolve();
      } else if (gameAsset.type == "font") {
        const assetFont = gameAsset as AssetFont;

        injectFont(assetFont.family, assetFont.weight, assetFont.fontUrl);
        await document.fonts.load(`1em "${assetFont.family}"`);
        resolve();
      }
    });
  }
}
