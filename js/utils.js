function getData(key, defaultValue = null) {

    const data = localStorage.getItem(key);

    if (data === null) {
        return defaultValue;
    }

    try {

        return JSON.parse(data);

    } catch (error) {

        console.error(error);

        return defaultValue;

    }

}


function saveData(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


function removeData(key) {

    localStorage.removeItem(key);

}


function formatCurrency(amount) {

    return "₹" +
        Number(amount).toLocaleString("en-IN");

}


function generateOrderId() {

    return "FR" +
        Date.now().toString().slice(-8);

}


function isLoggedIn() {

    return localStorage.getItem(
        "currentUser"
    ) !== null;

}


function getCurrentUser() {

    return getData(
        "currentUser",
        null
    );

}


function getCart() {

    return getData(
        "cart",
        []
    );

}


function saveCart(cart) {

    saveData("cart", cart);

}


function getFavorites() {

    return getData(
        "favorites",
        []
    );

}


function saveFavorites(favorites) {

    saveData(
        "favorites",
        favorites
    );

}


function showToast(message) {

    alert(message);

}