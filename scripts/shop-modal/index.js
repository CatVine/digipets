import { showElement, hideElement} from "../utils/index.js"

export const handleShopModal = (modal, closeButton) => {
    if (!modal.classList.contains('is--active')) {
        showElement(modal);
    } else {
        hideElement(modal);
    }

    const shopTabButtons = [...modal.querySelectorAll('.modal__tab-button')];
    const shopTabs = [...modal.querySelectorAll('.modal__tab-panel')];

    shopTabButtons.forEach((button) => {
        //find the associated tab panel from a data attribute on the button which points to the id of the panel
        const associatedTabPanel = shopTabs.filter((tab) => tab.id === button.dataset.toggle )[0];

        // when a button is clicked, switch the associated panel/tab to 'is--active' and deactivate the others
        button.addEventListener('click', () => { switchTab(shopTabs, associatedTabPanel)})
    })
}

export const switchTab = (tabs, tabPanel) => {
    tabs.forEach((tab) => {
        console.log(tab, tabPanel)
        if (tab === tabPanel) {
            showElement(tab);
        } else {
            hideElement(tab);
        }
        //change these functions to showElement, hideElement
    })
}