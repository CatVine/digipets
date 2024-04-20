import { showElement, hideElement} from "../utils/index.js"

export const handleShopModal = (modal, closeButton) => {
    if (!modal.classList.contains('is--active')) {
        showElement(modal);
    } else {
        hideElement(modal);
    }
}