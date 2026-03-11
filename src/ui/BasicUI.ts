import { AssetTextures } from "assets/AssetTextures";
import { Application, Container, Sprite } from "pixi.js";
import { Button } from "./Button";
import { gameEvents } from "gameEvents";
import { ReelFullSet } from "types/reelFullSet";
import { Win } from "./Win";
import { UI_BUTTON_Z_INDEX } from "utils/zIndexes";
import { NumberBox } from "./NumberBox";

const UI_SHIFT_Y = 60;
const UI_BOX_SCALE = 0.34;
const UI_BOX_SHIFT = 172;
const UI_BUTTONS_MAX_SIZE = 520;

export class BasicUI {
  winPresenter: Win;
  winContainer: Container;
  buttonsContainer: Container;
  winBox: NumberBox;
  betBox: NumberBox;
  money = 200;
  startButton: Button;
  isInRound: boolean = false;
  isWinningRound: boolean = false;
  winAmount = 0;
  bet = 10;

  constructor(assets: AssetTextures, app: Application, uiContainer: Container) {
    this.money = 200;
    const buttonsContainer = new Container();
    buttonsContainer.zIndex = UI_BUTTON_Z_INDEX;
    uiContainer.addChild(buttonsContainer);
    this.buttonsContainer = buttonsContainer;

    const winContainer = new Container();
    uiContainer.addChild(winContainer);
    this.winPresenter = new Win(winContainer);
    this.winContainer = winContainer;

    // Create Buttons
    const startButton = new Button(assets.spinButton, () => {
      if (!this.isInRound) {
        this.isInRound = true;
        this.startButton.disable();
        const params = new URLSearchParams(document.location.search);
        const forceWin = params.get("forceWin") != null;
        const forceLose = params.get("forceLose") != null;
        gameEvents.emit("requestRoundData", { bet: 10, forceWin, forceLose });
        this.winBox.set(0);
      }
    });
    startButton.scale = UI_BOX_SCALE;
    buttonsContainer.addChild(startButton);
    this.startButton = startButton;

    // Create Boxes
    const winBox = new NumberBox(assets.winField, 0);
    winBox.scale = UI_BOX_SCALE;
    winBox.x = -UI_BOX_SHIFT;
    buttonsContainer.addChild(winBox);
    this.winBox = winBox;

    const betBox = new NumberBox(assets.betField, this.bet);
    betBox.scale = UI_BOX_SCALE;
    betBox.x = UI_BOX_SHIFT;
    buttonsContainer.addChild(betBox);
    this.betBox = betBox;

    // Subscribe to events
    app.renderer.on("resize", () => this.resetLayout(app));
    this.resetLayout(app);

    gameEvents.subscribe((event, data) => {
      switch (event) {
        case "reelsStopped":
          this.reelsStopped();
          break;
        case "responseRoundData":
          this.isWinningRound = data.isWin;
          this.winAmount = data.winAmount;
          this.startRound(data.combination);
          break;
      }
    });

    uiContainer.sortChildren();
  }

  startRound(combination: ReelFullSet) {
    this.isInRound = true;
    this.startButton.disable();
    gameEvents.emit("startRound", { combination });
  }

  reelsStopped() {
    this.isInRound = false;
    this.startButton.enable();

    if (this.isWinningRound) {
      this.money += this.winAmount;
      this.winPresenter.trigger(this.winAmount);
      this.winBox.set(this.winAmount);
    }
  }

  resetLayout(app: Application) {
    const xMiddle = app.screen.width / 2;
    const yMiddle = app.screen.height / 2;
    const bottom = app.screen.height;
    const bottomLine = bottom - UI_SHIFT_Y;

    this.buttonsContainer.position.set(xMiddle, bottomLine);

    this.winContainer.x = xMiddle;
    this.winContainer.y = yMiddle;

    const scale = Math.min(app.screen.width / UI_BUTTONS_MAX_SIZE, 1);
    this.buttonsContainer.scale = scale;
  }

  update(delta: number) {
    this.startButton.update(delta);
    this.winPresenter.update(delta);
  }
}
