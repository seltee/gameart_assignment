import { GameAssets } from "./gameAssets";
import assetSheet from "assets/images/assetSheet.json";
import assetSheetImage from "assets/images/assetSheet.png";
import pixelifySans from "assets/fonts/PixelifySans-Bold.ttf";

export const baseAssets: GameAssets = {
  graphics: {
    type: "spritesheet",
    jsonData: assetSheet,
    imageUrl: assetSheetImage,
  },
  font: {
    type: "font",
    family: "Pixelify",
    weight: "600",
    fontUrl: pixelifySans,
  },
};
