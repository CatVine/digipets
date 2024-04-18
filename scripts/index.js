import { handleStart } from './start-screen/index.js';
import { toggleMobileNav } from './mobile-nav/index.js';

const mobileNavButton = document.querySelector('.js-mobile-nav__btn');
const mobileNavElement = document.querySelector('.js-mobile-nav');
// Handle game start

handleStart();

// Handle mobile nav toggling
if (mobileNavButton) {
    mobileNavButton.addEventListener('click', () => { toggleMobileNav(mobileNavElement) });
}