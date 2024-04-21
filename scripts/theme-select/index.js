export const handleThemeSelect = (event) => {
    const themeValue = event.target.value;
    localStorage.setItem('theme', themeValue);
    setTheme(themeValue);
}

export const setTheme = (value) => {
    const html = document.querySelector('html');
    html.classList = '';
    if (value === '') {
        html.classList.add('cotton-candy');
    } else {
        html.classList.add(value);
    }

}