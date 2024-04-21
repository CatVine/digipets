import { showElement, hideElement } from "../utils/index.js";
import { setStatistic } from "../statistic-bars/index.js";
import { items } from "../../assets/data/items.js";
import { setShopItems } from "../shop-modal/index.js";

export const petSelect = (petImageContainer, mainGameWindow, hungerBar, thirstBar) => {
    const selectScreen = document.querySelector('#petSelect');
    showElement(selectScreen);

    const options = [...document.querySelectorAll('.game__option-button')];

    options.forEach((option) => {
        option.addEventListener('click', function () {
            const petImage = option.querySelector('img');
            localStorage.setItem('petChoice', JSON.stringify({name: option.id, image: petImage.src}));
            
            setPetSprite(petImageContainer);
            setStatistic(100, hungerBar);
            setStatistic(100, thirstBar);
            setShopItems(items.data, shopModal);
            hideElement(selectScreen);
            showElement(mainGameWindow);
        })
    })
}

export const setPetSprite = (container) => {
    container.src = JSON.parse(localStorage.getItem("petChoice")).image;
}