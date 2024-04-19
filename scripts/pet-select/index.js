import { showElement, hideElement } from "../utils/index.js";

export const petSelect = (petImageContainer, mainGameWindow) => {
    const selectScreen = document.querySelector('#petSelect');
    showElement(selectScreen);

    const options = [...document.querySelectorAll('.game__option-button')];

    options.forEach((option) => {
        option.addEventListener('click', function () {
            const petImage = option.querySelector('img');
            localStorage.setItem('petChoice', petImage.src);

            setPetSprite(petImageContainer);
            hideElement(selectScreen);
            showElement(mainGameWindow);
        })
    })
}

export const setPetSprite = (container) => {
    container.src = localStorage.getItem("petChoice");
}