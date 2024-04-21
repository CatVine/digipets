import { handleStart } from './start-screen/index.js';
import { toggleMobileNav } from './mobile-nav/index.js';
import { handleThemeSelect, setTheme } from './theme-select/index.js';

// Handle mobile nav toggling
const mobileNavButton = document.querySelector('.js-mobile-nav__btn');
const mobileNavElement = document.querySelector('.js-mobile-nav');

if (mobileNavButton) {
    mobileNavButton.addEventListener('click', () => { toggleMobileNav(mobileNavElement) });
}

// Handle theme toggling

const themeToggle = document.querySelector('#themeSelect');
themeToggle.addEventListener('change', (event) => { handleThemeSelect( event )})
setTheme(localStorage.getItem('theme'));

// Handle game start

handleStart();
