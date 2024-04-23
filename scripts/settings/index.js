import { showElement, hideElement } from "../utils/index.js";

export const handleSettingsModal = (modal, window) => {
    const sound = modal.querySelector('#sound');
    const deleteDataButton = modal.querySelector('#deleteData');

    if (modal.classList.contains("is--hidden")) {
        showElement(modal);
        document.body.classList.add('modal--open');
    } else {
        hideElement(modal);
        document.body.classList.remove('modal--open');
    }

    sound.addEventListener('change', function (e) {
        if (e.target.checked) {
            localStorage.setItem('sound', true);
            setSound("true", window, sound);
        } else {
            localStorage.setItem('sound', false);
            setSound("false", window, sound);
        }
    })

    deleteDataButton.addEventListener('click', deleteData);
}

export const deleteData = () => {
    localStorage.clear();
    location.reload();
}

export const setSound = (soundOn, window, toggle) => {
    const bgMusicPlayer = document.querySelector('#bgMusic');
    const buttons = [...window.querySelectorAll('button')];
    const petSprite = document.querySelector('#petSprite');
    if (soundOn == "true") {
        buttons.forEach((button) => {
            button.addEventListener('click', toggleSound)
        })
        petSprite.addEventListener('click', toggleSound);
        bgMusicPlayer.play();
        toggle.checked = true;
    } else {
        buttons.forEach((button) => {
            button.removeEventListener('click', toggleSound);
        })
        petSprite.removeEventListener('click', toggleSound);
        bgMusicPlayer.pause();
        toggle.checked = false;
    }
}

export const toggleSound = (e) => {
    const clickSound = document.querySelector('#button');
    const itemSound = document.querySelector('#item');
    const dogSound = document.querySelector('#dog');
    if (e.target.hasAttribute("data-type")) {
        itemSound.load();
        itemSound.play();
    } else if (e.target.id === 'petSprite') {
        dogSound.load();
        dogSound.play();
    }
        else {
        clickSound.load();
        clickSound.play();
    }
}