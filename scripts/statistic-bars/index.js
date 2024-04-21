export const setStatistic = (value, element) => {
    element.value = Number(value);
    localStorage.setItem(element.id, value)
}

export const reduceStatistic = ( element, amount ) => {
    element.value -= amount;
    localStorage.setItem(element.id, element.value);
}

export const increaseStatistic = ( element, amount ) => {
    element.value += amount;
    localStorage.setItem(element.id, element.value);
}