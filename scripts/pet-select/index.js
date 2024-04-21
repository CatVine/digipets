import { showElement, hideElement } from "../utils/index.js";
import { setStatistic } from "../statistic-bars/index.js";

export const petSelect = (petImageContainer, mainGameWindow) => {
    const selectScreen = document.querySelector('#petSelect');
    showElement(selectScreen);

    const options = [...document.querySelectorAll('.game__option-button')];

    options.forEach((option) => {
        option.addEventListener('click', function () {
            const petImage = option.querySelector('img');
            localStorage.setItem('petChoice', petImage.src);

            setPetSprite(petImageContainer);
            setStatistic(100, hungerBar);
            setStatistic(100, thirstBar);
            hideElement(selectScreen);
            showElement(mainGameWindow);
        })
    })
}

export const setPetSprite = (container) => {
    container.src = localStorage.getItem("petChoice");
}