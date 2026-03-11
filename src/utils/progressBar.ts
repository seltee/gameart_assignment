import { Application, Container, Text } from "pixi.js";
import { GameText } from "ui/GameText";

export class LoadingBar {
  text: Text;
  resizeSubscription: () => void;
  app: Application;

  constructor(container: Container, app: Application) {
    this.app = app;
    this.text = new Text({
      text: this.getText(0),
      style: {
        fontSize: 24,
        lineHeight: 24,
        letterSpacing: 0,
        fill: 0x000000,
        align: "center",
      },
    });
    this.text.anchor.set(0.5, 0.5);
    container.addChild(this.text);

    this.resizeSubscription = () => {
      this.text.x = app.screen.width / 2;
      this.text.y = app.screen.height / 2;
    };
    this.resizeSubscription();
    app.renderer.on("resize", this.resizeSubscription);
  }

  getText(ratio: number) {
    return `LOADING ${Math.floor(ratio * 100)}%`;
  }

  updateCounter(ratio: number) {
    if (this.text) {
      this.text.text = this.getText(ratio);
    }
  }

  destroy() {
    this.text.destroy();
    this.app.renderer.off("resize", this.resizeSubscription);
  }
}
