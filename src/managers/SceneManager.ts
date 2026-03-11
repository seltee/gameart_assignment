import { AssetTextures } from "assets/AssetTextures";
import { GameAssets } from "assets/gameAssets";
import { LOGICAL_HEIGHT, LOGICAL_WIDTH } from "config";
import { Application, Container } from "pixi.js";
import { GameScene } from "scenes/GameScene";
import { Scene } from "scenes/Scene";
import { BasicUI } from "ui/BasicUI";

export class SceneManager {
  assets: GameAssets;
  assetTextures: AssetTextures;
  currentScene: Scene;
  gameContainer: Container;
  ui: BasicUI;

  constructor(
    app: Application,
    gameContainer: Container,
    uiContainer: Container,
    assets: GameAssets,
  ) {
    this.assets = assets;
    this.assetTextures = new AssetTextures(assets);
    this.currentScene = new GameScene(this.assetTextures, gameContainer);
    this.gameContainer = gameContainer;
    this.ui = new BasicUI(this.assetTextures, app, uiContainer);

    app.ticker.add(() => {
      const delta = app.ticker.deltaMS / 1000;
      this.currentScene.update(delta);
      this.ui.update(delta);
    });

    app.renderer.on("resize", () => this.resetLayout(app));
    this.resetLayout(app);
  }

  resetLayout(app: Application) {
    const scale = Math.min(
      app.screen.width / LOGICAL_WIDTH,
      app.screen.height / LOGICAL_HEIGHT,
    );

    this.gameContainer.scale.set(scale);
    this.gameContainer.position.set(
      app.screen.width / 2,
      app.screen.height / 2,
    );
  }
}
