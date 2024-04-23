import { hideElement } from "../utils/index.js";
import { startGameLoop } from "../game-loop/index.js";

export const handleStart = () => {
  const startScreen = document.querySelector("#startScreen");
  const startButton = startScreen.querySelector("button");

  startButton.addEventListener("click", function () {
    hideElement(startScreen);

    startButton.removeEventListener("click", function () {
      hideElement(startScreen);
    });

    startGameLoop();
  });
};

export const checkSound = () => {
  
}
