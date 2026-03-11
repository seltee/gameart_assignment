import { ReelFullSet } from "types/reelFullSet";
import { Server, ServerRequestRoundResult } from "./server";
import { ReelSymbol } from "entities/ReelSymbol";
import { ReelSymbolType } from "types/reelSymbolType";

function getRandomCombination(): ReelFullSet {
  return [
    [
      ReelSymbol.getRandomSymbolType(),
      ReelSymbol.getRandomSymbolType(),
      ReelSymbol.getRandomSymbolType(),
    ],
    [
      ReelSymbol.getRandomSymbolType(),
      ReelSymbol.getRandomSymbolType(),
      ReelSymbol.getRandomSymbolType(),
    ],
    [
      ReelSymbol.getRandomSymbolType(),
      ReelSymbol.getRandomSymbolType(),
      ReelSymbol.getRandomSymbolType(),
    ],
  ];
}

function isWinCombination(combination: ReelFullSet): boolean {
  return (
    combination[1][0] == combination[1][1] &&
    combination[1][1] == combination[1][2]
  );
}

function getWinAmount(type: ReelSymbolType): number {
  switch (type) {
    case "bar":
      return 5;
    case "bell":
      return 10;
    case "cherry":
      return 20;
    case "diamond":
      return 50;
    case "lemon":
      return 80;
    case "plum":
      return 100;
    case "seven":
      return 200;
    case "wild":
      return 500;
  }
}

export class FakeServer extends Server {
  requestRound(bet: number, forceWin?: boolean, forceLose?: boolean) {
    return new Promise<ServerRequestRoundResult>((resolve) => {
      setTimeout(
        () => {
          let combination = getRandomCombination();
          if (forceWin) {
            const winningSymbol = ReelSymbol.getRandomSymbolType();
            combination[1][0] = winningSymbol;
            combination[1][1] = winningSymbol;
            combination[1][2] = winningSymbol;
          } else if (forceLose) {
            while (isWinCombination(combination)) {
              combination = getRandomCombination();
            }
          }

          const isWin = isWinCombination(combination);
          const winAmount = isWin ? getWinAmount(combination[1][1]) : 0;

          resolve({
            isWin,
            winAmount,
            combination,
          });
        },
        Math.round(Math.random() * 200 + 20),
      );
    });
  }
}
