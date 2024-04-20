export const increaseLove = (amount, counterElement) => {
    let currentLoveTotal = Number(counterElement.textContent);
    currentLoveTotal = currentLoveTotal + amount;

    localStorage.setItem('loveTotal', currentLoveTotal);
    setLoveTotal(currentLoveTotal, counterElement)
}

export const setLoveTotal = (total, element) => {
    element.textContent = total;
    localStorage.setItem('loveTotal', total)

    if (total === undefined) {
        element.textContent = 0;
    }
}