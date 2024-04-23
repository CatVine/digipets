import { petSelect, setPetSprite } from "../pet-select/index.js";
import { checkForDataProperty } from "../utils/index.js";
import { hideElement, showElement } from "../utils/index.js";
import { handleLoveInterval, increaseLove, setLoveTotal } from "../love-counter/index.js";
import { handleShopModal, setShopItems, handleBuyItem } from "../shop-modal/index.js";
import { handleEquipItem, handleInventoryModal, setInventoryItems } from "../item-modal/index.js";
import { setStatistic, reduceStatistic } from "../statistic-bars/index.js";
import { items } from "../../assets/data/items.js";
import { setBackgroundImage, setEquippedItem } from "../item-modal/index.js";
import { handleSettingsModal, setSound } from "../settings/index.js";

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
  const hungerBar = document.querySelector('#hunger');
  const thirstBar = document.querySelector('#thirst');
  const defaultBGImage = items.data.decor.find(item => item.equipped === true).image;
  const settingsButton = document.querySelector('#settingsButton');
  const settingsCloseButton = document.querySelector('#settingsClose');
  const settingsModal = document.querySelector('#settingsModal');
  const soundToggle = settingsModal.querySelector('#sound');

  // Handle loading data and choosing a pet if there is no existing save data
  if (!checkForDataProperty('petChoice')) {
    petSelect(petImageContainer, mainGameWindow, hungerBar, thirstBar);
    setBackgroundImage(mainGameWindow, defaultBGImage);
    setLoveTotal(0, loveCounter);
  } else {
    const petType = JSON.parse(localStorage.getItem('petChoice')).name;
    setPetSprite(petImageContainer);
    setLoveTotal(localData.loveTotal, loveCounter);
    setStatistic(localData.hunger, hungerBar);
    setStatistic(localData.thirst, thirstBar);
    setShopItems(JSON.parse(localData.items), shopModal);
    setInventoryItems(JSON.parse(localData.items), inventoryModal);
    setBackgroundImage(mainGameWindow, JSON.parse(localData.items).decor.find(item => item.equipped === true).image);
    setEquippedItem(petImageContainer, JSON.parse(localData.items).clothing.find(item => item.equipped === true).image[petType]);
    setSound(localData.sound, mainGameWindow, soundToggle);
    shopModal = document.querySelector('#shopModal');
    showElement(mainGameWindow);
  }

  // Set pet love event

  petImageContainer.addEventListener('click', () => {
    increaseLove(50, loveCounter)
    petImageContainer.classList.add('petClick');
    setTimeout(() => { petImageContainer.classList.remove('petClick')}, "200");
  })

  // Handle shop modal events

  shopButton.addEventListener('click', () => { handleShopModal(shopModal) });
  shopCloseButton.addEventListener('click', () => { 
    hideElement(shopModal),
    document.body.classList.remove('modal--open');
  })

  // Handle item modal 
  inventoryButton.addEventListener('click', () => { handleInventoryModal(inventoryModal, petImageContainer) });
  inventoryCloseButton.addEventListener('click', () => { 
    hideElement(inventoryModal),
    document.body.classList.remove('modal--open')})

  settingsButton.addEventListener('click', () => { handleSettingsModal(settingsModal, mainGameWindow) });
  settingsCloseButton.addEventListener('click', () => { 
    hideElement(settingsModal),
    document.body.classList.remove('modal--open'); });
  // Set progress bar decrease

  setInterval(() => { reduceStatistic(hungerBar, 1) }, 1000);
  setInterval(() => { reduceStatistic(thirstBar, 1) }, 1000)
  setInterval(() => { handleLoveInterval(hungerBar, thirstBar, loveCounter) }, 5000);
}