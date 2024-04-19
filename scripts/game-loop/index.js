import { petSelect, setPetSprite } from "../pet-select/index.js";
import { checkForDataProperty } from "../utils/index.js";
import { hideElement, showElement } from "../utils/index.js";

export const startGameLoop = () => {

  // Load any existing game data from local storage
  const localData = window.localStorage;
  const mainGameWindow = document.querySelector('#main-game');
  const petImageContainer = document.querySelector(".game__sprite");

  // Handle choosing a pet if there is no existing save data
  if (!checkForDataProperty('petChoice')) {
    petSelect(petImageContainer, mainGameWindow);
  } else {
    setPetSprite(petImageContainer);
    showElement(mainGameWindow);
  }
};
