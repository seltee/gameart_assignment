import { baseAssets } from "assets/baseAssets";
import { SceneManager } from "managers/SceneManager";
import { createGameCanvas } from "utils/createGameCanvas";
import { loadGame } from "utils/loadGame";

const GAME_ROOT_ID = "game-root";

document.addEventListener("DOMContentLoaded", function (event) {
  const gameContainer = document.getElementById(GAME_ROOT_ID);
  if (!gameContainer) {
    alert("Unable to get game's root");
    return;
  }

  const canvas = createGameCanvas(gameContainer, 100);

  loadGame(SceneManager, baseAssets, canvas);
});
