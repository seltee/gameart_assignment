import { ServerRequestRoundResult } from "server/server";
import { ReelFullSet } from "types/reelFullSet";
import { Mediator } from "utils/mediator";

export type GameEvents = {
  startRound: { combination: ReelFullSet };
  reelsStopped: null;
  requestRoundData: { bet: number; forceWin?: boolean; forceLose?: boolean };
  responseRoundData: ServerRequestRoundResult;
};

export const gameEvents = new Mediator<GameEvents>();
