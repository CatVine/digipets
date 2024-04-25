
export const toggleMobileNav = (element, toggleButton) => {
    if (element.classList.contains('is--active')) {
        element.classList.remove('is--active');
        toggleButton.ariaExpanded = false;
    } else {
        element.classList.add('is--active');
        toggleButton.ariaExpanded = true;
    }
}