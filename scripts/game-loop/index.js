import { petSelect, setPetSprite } from "../pet-select/index.js";
import { checkForDataProperty } from "../utils/index.js";
import { hideElement, showElement } from "../utils/index.js";
import { increaseLove, setLoveTotal } from "../love-counter/index.js";
import { handleShopModal, setShopItems, handleBuyItem } from "../shop-modal/index.js";
import { items } from "../../assets/data/items.js";
import { handleEquipItem, handleInventoryModal, setInventoryItems } from "../item-modal/index.js";

export const startGameLoop = () => {

  // Load any existing game data from local storage
  const localData = window.localStorage;
  const mainGameWindow = document.querySelector('#main-game');
  const petImageContainer = document.querySelector("#petSprite");
  const loveCounter = document.querySelector('#loveCounter');
  const shopButton = document.querySelector('#shopButton');
  let shopModal = document.querySelector('#shopModal');
  const shopCloseButton = document.querySelector('#shopClose');
  const inventoryButton = document.querySelector('#itemsButton');
  let inventoryModal = document.querySelector('#inventoryModal')
  const inventoryCloseButton = document.querySelector('#inventoryClose');

  // Handle loading data and choosing a pet if there is no existing save data
  if (!checkForDataProperty('petChoice')) {
    petSelect(petImageContainer, mainGameWindow);
    setShopItems(items.data, shopModal);
    setLoveTotal(0, loveCounter)
  } else {
    setPetSprite(petImageContainer);
    setLoveTotal(localData.loveTotal, loveCounter);
    setShopItems(JSON.parse(localData.items), shopModal);
    setInventoryItems(JSON.parse(localStorage.getItem('items')), inventoryModal);
    shopModal = document.querySelector('#shopModal');
    showElement(mainGameWindow);
  }

  // Set pet love event

  petImageContainer.addEventListener('click', () => {
    increaseLove(50, loveCounter)
  })

  // Handle shop modal events

  shopButton.addEventListener('click', () => { handleShopModal(shopModal) });
  shopCloseButton.addEventListener('click', () => { hideElement(shopModal) })

  const shopItemButtons = [...shopModal.querySelectorAll('.modal__item-button')];
  shopItemButtons.forEach((button) => {
    button.addEventListener('click', () => { handleBuyItem(button) })
  })

  // Handle item modal 
  inventoryButton.addEventListener('click', () => { handleInventoryModal(inventoryModal) });
  inventoryCloseButton.addEventListener('click', () => { hideElement(inventoryModal) })

};
