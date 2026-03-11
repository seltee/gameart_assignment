import { gameEvents } from "gameEvents";
import { ReelFullSet } from "types/reelFullSet";

export interface ServerRequestRoundResult {
  isWin: boolean;
  winAmount: number;
  combination: ReelFullSet;
}

export abstract class Server {
  constructor() {
    gameEvents.subscribe(async (event, data) => {
      if (event == "requestRoundData") {
        const roundData = await this.requestRound(data.bet, data.forceWin, data.forceLose);
        gameEvents.emit("responseRoundData", roundData);
      }
    });
  }

  abstract requestRound(
    bet: number,
    forceWin?: boolean,
    forceLose?: boolean,
  ): Promise<ServerRequestRoundResult>;
}
