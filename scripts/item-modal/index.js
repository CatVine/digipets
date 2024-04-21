import { increaseStatistic } from "../statistic-bars/index.js";
import { showElement, hideElement } from "../utils/index.js";

export const handleInventoryModal = (modal, petImageContainer) => {
  setInventoryItems(JSON.parse(localStorage.getItem("items")), modal);
  const inventoryItemButtons = [
    ...modal.querySelectorAll(".modal__item-button"),
  ];
  inventoryItemButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleEquipItem(inventoryItemButtons, button, petImageContainer);
    });
  });

  if (modal.classList.contains("is--hidden")) {
    showElement(modal);
  } else {
    hideElement(modal);
  }

  const shopTabButtons = [...modal.querySelectorAll(".modal__tab-button")];
  const shopTabs = [...modal.querySelectorAll(".modal__tab-panel")];

  shopTabButtons.forEach((button) => {
    const associatedTabPanel = shopTabs.filter(
      (tab) => tab.id === button.dataset.toggle
    )[0];

    button.addEventListener("click", () => {
      switchTab(shopTabs, associatedTabPanel, shopTabButtons, button);
    });
  });
};

export const switchTab = (tabs, tabPanel, tabButtons, activeTab) => {
  tabButtons.forEach((button) => {
    button.classList.remove("is--active");
    button.ariaSelected = false;
  });

  tabs.forEach((tab) => {
    if (tab === tabPanel) {
      showElement(tab);
    } else {
      hideElement(tab);
    }
  });

  tabButtons.forEach((button) => {
    if (button === activeTab) {
      button.classList.add("is--active");
      button.ariaSelected = true;
    }
  });
};

export const setInventoryItems = (itemData, modal) => {
  const careItems = itemData.care.filter((item) => item.quantity > 0);
  const clothingItems = itemData.clothing.filter(
    (item) => item.purchased === true
  );
  const decorItems = itemData.decor.filter((item) => item.purchased === true);

  const inventoryTabs = [...modal.querySelectorAll(".modal__tab-panel")];

  inventoryTabs.forEach((tab) => {
    const listContainer = tab.querySelector("ul");
    listContainer.innerHTML = "";
    let listItems;

    switch (tab.id) {
      case "inventoryCare":
        listItems = composeInventoryElements(careItems, "care");
        listItems.forEach((item) => {
          listContainer.insertAdjacentHTML("beforeend", item);
        });
        break;
      case "inventoryClothing":
        listItems = composeInventoryElements(clothingItems, "clothing");
        listItems.forEach((item) => {
          listContainer.insertAdjacentHTML("beforeend", item);
        });
        break;
      case "inventoryDecor":
        listItems = composeInventoryElements(decorItems, "decor");
        listItems.forEach((item) => {
          listContainer.insertAdjacentHTML("beforeend", item);
        });
        break;
      default:
        break;
    }
  });
};

export const composeInventoryElements = (items, type) => {
  const petChoice = JSON.parse(localStorage.getItem("petChoice")).name;
  const listItems = items.map(
    (item) =>
      `<li class="modal__item">
        <img class="modal__item-image" src=${
          !(type === "clothing") ? item.image : item.image[petChoice]
        } alt="" />

        <div class="modal__item-information">
            <p class="modal__item-name">${item.name}</p>
            ${type === "care" ? (`<p class="modal__item-value">x
            <span class="modal__item-quantity">
                ${item.quantity}
            </span>
        </p>`) : ''}
        </div>

        <p class="modal__item-description">
            ${item.description}
        </p>

        <button class="modal__item-button button button--small ${
          item.equipped ? " equipped" : ""
        }" data-type="${type}" data-item-id="${item.id}"">
            ${type === "care" ? "Use" : item.equipped ? "Equipped" : "Equip"}
        </button>
    </li>`
  );

  return listItems;
};

export const handleEquipItem = (tabButtons, button, sprite) => {
  const itemType = button.dataset.type;
  const itemId = Number(button.dataset.itemId);
  let currentItems = JSON.parse(localStorage.getItem("items"));

  let itemCategory = currentItems[itemType];
  let itemToUpdate;

  if (itemType !== "care") {
    const sameTabButtons = tabButtons.filter(button => button.dataset.type === itemType);
    sameTabButtons.forEach((button) => {
        button.classList.remove("equipped");
        button.textContent = "Equip";
    });
  }

  itemCategory.forEach((item) => {
    if (itemType !== "care") {
      item.equipped = false;
    }

    if (item.id === itemId) {
      itemToUpdate = item;
    }
  });

  if (itemToUpdate) {
    switch (itemType) {
      case "care":
        const increaseValue = itemToUpdate.replenishValue;
        const statisticType = itemToUpdate.statistic;
        const relevantStatisticBar = document.querySelector(
          `#${statisticType}`
        );
        const quantityCounter = button.parentElement.querySelector('.modal__item-quantity');
        if (itemToUpdate.quantity > 0) {
          itemToUpdate.quantity -= 1;
          console.log(quantityCounter, quantityCounter.textContent);
          quantityCounter.textContent = Number(quantityCounter.textContent) - 1;
        }
        if (itemToUpdate.quantity === 0) {
          button.classList.add("disabled");
          button.textContent = "None";
        }
        increaseStatistic(relevantStatisticBar, increaseValue);
        break;
      case "decor":
        if (itemToUpdate.purchased === true) {
          const mainGameWindow = document.querySelector("#main-game");
          setBackgroundImage(mainGameWindow, itemToUpdate.image);
          itemToUpdate.equipped = true;
          button.classList.add("equipped");
          button.textContent = "Equipped";
        }
        break;
      default:
        const petChoice = JSON.parse(localStorage.getItem("petChoice")).name;
        itemToUpdate.equipped = true;
        sprite.src = itemToUpdate.image[petChoice];
        button.classList.add("equipped");
        button.textContent = "Equipped";
        break;
    }
  }
  localStorage.setItem("items", JSON.stringify(currentItems));
};

export const setBackgroundImage = (element, imageSrc) => {
  element.style.backgroundImage = "url(" + imageSrc + ")";
};

export const setEquippedItem = (element, imageSrc) => {
  if (imageSrc) {
    element.src = imageSrc;
  }
};
