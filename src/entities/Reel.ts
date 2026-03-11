import { AssetTextures } from "assets/AssetTextures";
import { Container } from "pixi.js";
import { ReelSymbolType } from "types/reelSymbolType";
import { ReelSymbol } from "./ReelSymbol";
import { assert } from "utils/assert";

const SYM_DISTANCE = 252;
const REEL_MAX_SPEED = 28;
const REEL_ACCELERATION = 24;
const REEL_BACKWARDS_ACCELERATION = 60;
const SPIN_QUEUE_LENGTH = 8;

type REEL_STATE = "idle" | "waiting" | "spinning" | "roll-back";

export class Reel extends Container {
  assets: AssetTextures;
  yShift: number;
  symbols: ReelSymbol[];
  state: REEL_STATE = "idle";
  goBackward = 0.0;
  goForward = 0.0;
  delay = 0;
  queue: ReelSymbolType[] = [];
  resolveSpinStop?: (value: unknown) => void;

  constructor(assets: AssetTextures) {
    super();
    this.assets = assets;
    this.yShift = 0;

    this.symbols = Array.from({ length: 4 }, () => {
      const reelSymbol = new ReelSymbol(
        assets,
        ReelSymbol.getRandomSymbolType(),
      );
      this.addChild(reelSymbol);
      return reelSymbol;
    });
  }

  startSpin(
    delay: number,
    target: [ReelSymbolType, ReelSymbolType, ReelSymbolType],
  ) {
    return new Promise((resolve) => {
      this.resolveSpinStop = resolve;
      this.state = "waiting";
      this.goBackward = 5;
      this.goForward = 0;
      this.delay = delay;

      this.queue = [
        ...Array.from({ length: SPIN_QUEUE_LENGTH }, () =>
          ReelSymbol.getRandomSymbolType(),
        ),
        ...target,
        ReelSymbol.getRandomSymbolType(),
      ];
    });
  }

  update(delta: number) {
    switch (this.state) {
      case "waiting":
        this.stateProcessWaiting(delta);
        break;
      case "spinning":
        this.stateProcessSpinning(delta);
        break;
      case "roll-back":
        this.stateProcessRollBack(delta);
        break;
    }

    this.symbols.forEach((symbol, i) => {
      symbol.x = 0;
      symbol.y = i * SYM_DISTANCE - SYM_DISTANCE * 2 + this.yShift;
    });
  }

  getNextSymbol(): ReelSymbolType {
    if (this.queue.length > 0) {
      const result = this.queue.shift();
      if (result) {
        return result;
      }
    }
    return ReelSymbol.getRandomSymbolType();
  }

  stateProcessWaiting(delta: number) {
    this.delay -= delta;
    if (this.delay < 0) {
      this.state = "spinning";
    }
  }

  stateProcessSpinning(delta: number) {
    if (this.yShift > SYM_DISTANCE) {
      this.yShift -= SYM_DISTANCE;
      const nextSymbol = this.getNextSymbol();
      const symbol = assert(this.symbols.pop(), "symbol in reel doesn't exist");
      symbol.switchType(nextSymbol);
      this.symbols.unshift(symbol);
    }

    const valueChange = delta * REEL_ACCELERATION;
    this.goForward = Math.min(this.goForward + valueChange, REEL_MAX_SPEED);
    this.goBackward = Math.max(this.goBackward - valueChange, 0);
    this.yShift += this.goForward - this.goBackward;

    if (this.queue.length == 0) {
      this.state = "roll-back";
      this.goForward = this.goForward / 3;
    }
  }

  stateProcessRollBack(delta: number) {
    const valueChange = delta * REEL_BACKWARDS_ACCELERATION;
    this.goBackward = 0;
    this.goForward = Math.max(this.goForward - valueChange, -REEL_MAX_SPEED);

    if (this.yShift < 0) {
      this.yShift = 0;
      this.state = "idle";
      if (this.resolveSpinStop) {
        this.resolveSpinStop(null);
      }
    }

    this.yShift += this.goForward;
  }

  destroy() {}
}
