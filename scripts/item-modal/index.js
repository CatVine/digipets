import { showElement, hideElement } from "../utils/index.js"

export const handleInventoryModal = (modal) => {
    setInventoryItems(JSON.parse(localStorage.getItem('items')), modal);

    const inventoryItemButtons = [...modal.querySelectorAll('.modal__item-button')];
    inventoryItemButtons.forEach((button) => {
        button.addEventListener('click', () => { handleEquipItem(inventoryItemButtons, button) })
    })

    if (!modal.classList.contains('is--active')) {
        showElement(modal);
    } else {
        hideElement(modal);
    }

    const shopTabButtons = [...modal.querySelectorAll('.modal__tab-button')];
    const shopTabs = [...modal.querySelectorAll('.modal__tab-panel')];

    shopTabButtons.forEach((button) => {
        const associatedTabPanel = shopTabs.filter((tab) => tab.id === button.dataset.toggle)[0];

        button.addEventListener('click', () => { switchTab(shopTabs, associatedTabPanel, shopTabButtons, button) })
    })
}

export const switchTab = (tabs, tabPanel, tabButtons, activeTab) => {
    tabButtons.forEach(button => button.classList.remove('is--active'));

    tabs.forEach((tab) => {
        if (tab === tabPanel) {
            showElement(tab);
        } else {
            hideElement(tab);
        }
    })

    tabButtons.forEach(button => {
        if (button === activeTab) {
            button.classList.add('is--active');
        }
    })
}

export const setInventoryItems = (itemData, modal) => {
    const careItems = itemData.care.filter(item => item.quantity > 0)
    const clothingItems = itemData.clothing.filter(item => item.purchased === true);
    const decorItems = itemData.decor.filter(item => item.purchased === true);

    const inventoryTabs = [...modal.querySelectorAll('.modal__tab-panel')];

    inventoryTabs.forEach((tab) => {
        const listContainer = tab.querySelector('ul');
        listContainer.innerHTML = '';
        let listItems;

        switch (tab.id) {
            case "inventoryCare":
                listItems = composeInventoryElements(careItems, 'care');
                listItems.forEach((item) => {
                    listContainer.insertAdjacentHTML('beforeend', item);
                })
                break;
            case "inventoryClothing":
                listItems = composeInventoryElements(clothingItems, 'clothing');
                listItems.forEach((item) => {
                    listContainer.insertAdjacentHTML('beforeend', item);
                })
                break;
            case "inventoryDecor":
                listItems = composeInventoryElements(decorItems, 'decor');
                listItems.forEach((item) => {
                    listContainer.insertAdjacentHTML('beforeend', item);
                })
                break;
            default:
                break;
        }
    })
}

export const composeInventoryElements = (items, type) => {
    const listItems = items.map(item =>
        `<li class="modal__item">
        <img class="modal__item-image" src=${item.image} alt="" />

        <div class="modal__item-information">
            <p class="modal__item-name">${item.name}</p>
        </div>

        <p class="modal__item-description">
            ${item.description}
        </p>

        <button class="modal__item-button button button--small ${item.equipped ? ' equipped' : ''}" data-type="${type}" data-item-id="${item.id}"">
            ${type === "care" ? "Use" : (item.equipped ? 'Equipped' : 'Equip')}
        </button>
    </li>`
    )

    return listItems;
}

export const handleEquipItem = (tabButtons, button) => {
    const itemType = button.dataset.type;
    const itemId = Number(button.dataset.itemId);
    let currentItems = JSON.parse(localStorage.getItem('items'));

    let itemCategory = currentItems[itemType];
    let itemToUpdate;

    if (itemType !== 'care') {
        tabButtons.forEach((button) => {
            button.classList.remove('equipped');
            button.textContent = 'Equip';
        })
    }

    itemCategory.forEach((item) => {
        if ((itemType !== 'care')) {
            item.equipped = false;
        }

        if (item.id === itemId) {
            itemToUpdate = item;
        }
    })
    
    if (itemToUpdate) {
        switch (itemType) {
            case 'care':
                itemToUpdate.quantity -= 1;
                break;
            default:
                itemToUpdate.equipped = true;
                button.classList.add('equipped');
                button.textContent = 'Equipped';
        }
    }
    localStorage.setItem('items', JSON.stringify(currentItems));
} 