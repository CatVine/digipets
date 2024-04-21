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

export const handleLoveInterval = (statistic1, statistic2, counterElement) => {
    const statisticTotal = statistic1.value + statistic2.value;
    const statisticAverage = statisticTotal / 2;

    switch (true) {
        case (statisticAverage > 50):
            increaseLove(100, counterElement);
            break;
        case (0 < statisticAverage < 50 ):
            increaseLove(50, counterElement);
            break;
        default:
            break;
    }
}