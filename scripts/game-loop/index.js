import { petSelect } from "../pet-select/index.js";
import { checkForDataProperty } from "../utils/index.js";
import { hideElement, showElement } from "../utils/index.js";

export const startGameLoop = () => {
    const mainGameWindow = document.querySelector('#main-game');
    showElement(mainGameWindow);

  // Load any existing game data from local storage
  const localData = window.localStorage;

  // Handle choosing a pet if there is no existing save data
  if (!checkForDataProperty('petChoice')) {
    petSelect();
  } else {
    const petSpriteContainer = document.querySelector(".game__sprite");
    petSpriteContainer.src = localStorage.getItem("petChoice");
  }
};
