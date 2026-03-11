import { Text } from "pixi.js";

export class GameText extends Text {
  constructor(text: string, fontSize: number, color: number) {
    super({
      text,
      style: {
        fontSize: fontSize,
        lineHeight: fontSize,
        fontFamily: "Pixelify",
        letterSpacing: 0,
        fill: color,
        align: "center",
      },
    });
  }
}
