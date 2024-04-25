
export const toggleMobileNav = (element, toggleButton) => {
    if (element.classList.contains('is--active')) {
        element.classList.remove('is--active');
        toggleButton.ariaExpanded = false;
        document.body.classList.remove('modal--open');
    } else {
        element.classList.add('is--active');
        toggleButton.ariaExpanded = true;
        document.body.classList.add('modal--open');
    }
}