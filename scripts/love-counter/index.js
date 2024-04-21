export const increaseLove = (amount, counterElement) => {
    let currentLoveTotal = Number(counterElement.textContent);
    currentLoveTotal = currentLoveTotal + amount;

    localStorage.setItem('loveTotal', currentLoveTotal);
    setLoveTotal(currentLoveTotal, counterElement)
}

export const setLoveTotal = (total, element) => {
    if (total === undefined || total === NaN) {
        element.textContent = 0;
        localStorage.setItem('loveTotal', 0)
    } else {
        element.textContent = total;
        localStorage.setItem('loveTotal', total)
    }
}