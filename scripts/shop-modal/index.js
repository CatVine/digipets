import { showElement, hideElement } from "../utils/index.js";
import { setLoveTotal } from "../love-counter/index.js";

export const handleShopModal = (modal) => {
  setShopItems(JSON.parse(localStorage.getItem("items")), shopModal);
  const soundOn = localStorage.getItem('sound');

  const shopItemButtons = [...modal.querySelectorAll(".modal__item-button")];

  shopItemButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleBuyItem(button);
      if (soundOn) {
        toggleSound(e);
      }
    });
  });
  
  if (modal.classList.contains("is--hidden")) {
    showElement(modal);
    document.body.classList.add('modal--open');
  } else {
    hideElement(modal);
    document.body.classList.remove('modal--open');
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
  tabButtons.forEach((button) => button.classList.remove("is--active"));

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
    }
  });
};

export const setShopItems = (itemData, modal) => {
  const careItems = itemData.care;
  const clothingItems = itemData.clothing;
  const decorItems = itemData.decor;
  localStorage.setItem("items", JSON.stringify(itemData));

  const shopTabs = [...modal.querySelectorAll(".modal__tab-panel")];

  shopTabs.forEach((tab) => {
    const listContainer = tab.querySelector("ul");
    listContainer.innerHTML = "";
    let listItems;

    switch (tab.id) {
      case "shopCare":
        listItems = composeShopElements(careItems, "care");
        listItems.forEach((item) => {
          listContainer.insertAdjacentHTML("beforeend", item);
        });
        break;
      case "shopClothing":
        listItems = composeShopElements(clothingItems, "clothing");
        listItems.forEach((item) => {
          listContainer.insertAdjacentHTML("beforeend", item);
        });
        break;
      case "shopDecor":
        listItems = composeShopElements(decorItems, "decor");
        listItems.forEach((item) => {
          listContainer.insertAdjacentHTML("beforeend", item);
        });
        break;
      default:
        break;
    }
  });
};

export const composeShopElements = (items, type) => {
  const petChoice = JSON.parse(localStorage.getItem("petChoice")).name;
  const listItems = items.map(
    (item) =>
      `<li class="modal__item">
        <img class="modal__item-image" src=${
          !(type === "clothing") ? item.image : item.image[petChoice]
        } alt="" />

        <div class="modal__item-information">
            <p class="modal__item-name">${item.name}</p>
            <p class="modal__item-value">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px"
                    height="20px" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM7.00061 16.4209C6.68078 16.1577 6.20813 16.2036 5.94491 16.5234C5.68169 16.8432 5.72758 17.3159 6.04741 17.5791L7.00061 16.4209ZM2.34199 13.4115C2.54074 13.7749 2.99647 13.9084 3.35988 13.7096C3.7233 13.5108 3.85677 13.0551 3.65801 12.6917L2.34199 13.4115ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM9.42605 18.3219C8.63014 17.6945 7.82129 17.0963 7.00061 16.4209L6.04741 17.5791C6.87768 18.2624 7.75472 18.9144 8.49742 19.4999L9.42605 18.3219ZM3.65801 12.6917C3.0968 11.6656 2.75 10.5033 2.75 9.1371H1.25C1.25 10.7746 1.66995 12.1827 2.34199 13.4115L3.65801 12.6917Z"
                        fill="#1C274C" />
                </svg>
                <span class="modal__item-cost">
                    ${item.price}
                </span>
            </p>
        </div>

        <p class="modal__item-description">
            ${item.description}
        </p>

        <button class="modal__item-button button button--small ${
          item.purchased ? " disabled" : ""
        }" data-type="${type}" data-item-id="${item.id}" data-item-price="${
        item.price
      } ">
            ${item.purchased ? "Sold Out" : "Buy"}
        </button>
    </li>`
  );

  return listItems;
};

export const handleBuyItem = (button) => {
  const itemType = button.dataset.type;
  const itemId = Number(button.dataset.itemId);
  const itemPrice = Number(button.dataset.itemPrice);
  const currentLove = localStorage.getItem("loveTotal");
  const loveElement = document.querySelector("#loveCounter");
  let currentItems = JSON.parse(localStorage.getItem("items"));

  if (currentLove >= itemPrice) {
    setLoveTotal(currentLove - itemPrice, loveElement);

    let itemCategory = currentItems[itemType];
    let itemToUpdate;
    itemCategory.forEach((item) => {
      if (item.id === itemId) {
        itemToUpdate = item;
      }
    });
    if (itemToUpdate) {
      switch (itemType) {
        case "care":
          itemToUpdate.quantity += 1;
          break;
        default:
          itemToUpdate.purchased = true;
          button.classList.add("disabled");
          button.textContent = "Sold out";
          break;
      }
    }
    localStorage.setItem("items", JSON.stringify(currentItems));
  } else {
    console.log("not enough love!");
  }
};
