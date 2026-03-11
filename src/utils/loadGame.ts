import { GameAssets } from "assets/gameAssets";
import { SceneManager } from "managers/SceneManager";
import { Application, Container } from "pixi.js";
import { AssetsLoader } from "assets/AssetsLoader";
import { LoadingBar } from "./progressBar";
import { FakeServer } from "server/fakeServer";

export async function loadGame<Type extends SceneManager>(
  sceneManager: new (
    ...args: ConstructorParameters<typeof SceneManager>
  ) => Type,
  assets: GameAssets,
  canvas: HTMLCanvasElement,
) {
  // Init PIXI
  const app = new Application();
  await app.init({
    resizeTo: window,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    canvas: canvas,
    background: "0xffffffff",
  });

  // Create stage base
  const stage = app.stage;
  const gameContainer = new Container();
  stage.zIndex = 0;
  stage.sortableChildren = true;
  stage.eventMode = "static";
  stage.addChild(gameContainer);

  const uiContainer = new Container();
  uiContainer.zIndex = 1;
  uiContainer.sortableChildren = true;
  uiContainer.eventMode = "static";
  stage.addChild(uiContainer);
  stage.sortChildren();

  // Load assets
  const loadingBar = new LoadingBar(gameContainer, app);
  const assetsLoader = new AssetsLoader(assets);
  await assetsLoader.loadAll((ratio) => loadingBar.updateCounter(ratio));
  loadingBar.destroy();

  // Create fake server connection
  new FakeServer();

  // Start game
  return new sceneManager(app, gameContainer, uiContainer, assets);
}
