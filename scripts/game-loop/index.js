import { petSelect, setPetSprite } from "../pet-select/index.js";
import { checkForDataProperty } from "../utils/index.js";
import { hideElement, showElement } from "../utils/index.js";
import { increaseLove, setLoveTotal } from "../love-counter/index.js";

export const startGameLoop = () => {

  // Load any existing game data from local storage
  const localData = window.localStorage;
  const mainGameWindow = document.querySelector('#main-game');
  const petImageContainer = document.querySelector(".game__sprite");
  const loveCounter = document.querySelector('.game__love-value');

  // Handle choosing a pet if there is no existing save data
  if (!checkForDataProperty('petChoice')) {
    petSelect(petImageContainer, mainGameWindow);
  } else {
    setPetSprite(petImageContainer);
    setLoveTotal(localData.loveTotal, loveCounter);
    showElement(mainGameWindow);
  }

  // Set pet love event

  petImageContainer.addEventListener('click', () => { 
    increaseLove(10, loveCounter)
  })
};
