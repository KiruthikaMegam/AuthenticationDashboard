export function getStorageItem(key) {

    const item =
        localStorage.getItem(key);

    if (!item) {
        return null;
    }

    try {

        return JSON.parse(item);

    } catch {

        return item;
    }
}


export function setStorageItem(
    key,
    value
) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}


export function removeStorageItem(key) {

    localStorage.removeItem(key);
}


export function clearStorage() {

    localStorage.clear();
}