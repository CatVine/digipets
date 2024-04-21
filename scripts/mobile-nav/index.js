
export const toggleMobileNav = (element) => {
    if (element.classList.contains('is--active')) {
        element.classList.remove('is--active');
    } else {
        element.classList.add('is--active');
    }
}