import { petSelect, setPetSprite } from "../pet-select/index.js";
import { checkForDataProperty } from "../utils/index.js";
import { hideElement, showElement } from "../utils/index.js";
import { increaseLove, setLoveTotal } from "../love-counter/index.js";
import { handleShopModal, setShopItems, handleBuyItem } from "../shop-modal/index.js";
import { items } from "../../assets/data/items.js";

export const startGameLoop = () => {

  // Load any existing game data from local storage
  const localData = window.localStorage;
  const mainGameWindow = document.querySelector('#main-game');
  const petImageContainer = document.querySelector("#petSprite");
  const loveCounter = document.querySelector('#loveCounter');
  const shopButton = document.querySelector('#shopButton');
  let shopModal = document.querySelector('#shopModal');
  const shopCloseButton = document.querySelector('#shopClose');
  const itemsButton = document.querySelector('#itemsButton');

  // Handle loading data and choosing a pet if there is no existing save data
  if (!checkForDataProperty('petChoice')) {
    petSelect(petImageContainer, mainGameWindow);
    setShopItems(items.data, shopModal);
  } else {
    setPetSprite(petImageContainer);
    setLoveTotal(localData.loveTotal, loveCounter);
    setShopItems(JSON.parse(localData.items), shopModal);
    shopModal = document.querySelector('#shopModal');
    showElement(mainGameWindow);
  }

  // Set pet love event

  petImageContainer.addEventListener('click', () => {
    increaseLove(10, loveCounter)
  })

  // Handle shop modal events

  shopButton.addEventListener('click', () => { handleShopModal(shopModal, shopCloseButton) });
  shopCloseButton.addEventListener('click', () => { hideElement(shopModal) })

  const itemButtons = [...shopModal.querySelectorAll('.modal__item-button')];
  itemButtons.forEach((button) => {
    button.addEventListener('click', () => { handleBuyItem(button) })
  })
};
