export const hideElement = (element) => {
    element.classList.add('is--hidden');
}

export const showElement = (element) => {
    element.classList.remove('is--hidden');
}

export const checkForDataProperty = (property) => {
    let propertyExists;
    
    if (localStorage.getItem(property)) {
        propertyExists = true;
    } else {
        propertyExists = false;
    }
    return propertyExists;
}