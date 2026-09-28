const currentUser = getCurrentUser();

if (!currentUser) {
    window.location.href = "../login.html";
}


// Get order ID

const params =
    new URLSearchParams(window.location.search);

const orderId =
    params.get("id");


// Get orders

const orders =
    getData("orders", []);


// Find order

const order =
    orders.find(
        item => item.id === orderId
    );


// If order doesn't exist

if (!order) {

    alert("Order not found.");

    window.location.href =
        "orders.html";

}


// Display order

function displayOrder() {

    document.getElementById("orderId")
        .textContent = order.id;


    document.getElementById("orderStatus")
        .textContent = order.status;


    document.getElementById("paymentMethod")
        .textContent =
        order.paymentMethod === "COD"
            ? "Cash on Delivery"
            : order.paymentMethod;


    document.getElementById("orderTotal")
        .textContent =
        formatCurrency(order.total);


    const address =
        order.address;


    document.getElementById(
        "deliveryAddress"
    ).textContent =
        `${address.house}, ${address.street}, ${address.city} - ${address.pincode}`;

}


// Track

function trackOrder() {

    window.location.href =
        `track-order.html?id=${order.id}`;

}


// View orders

function viewOrders() {

    window.location.href =
        "orders.html";

}


// Continue shopping

function continueShopping() {

    window.location.href =
        "restaurants.html";

}


// Cart count

function updateCartCount() {

    const cart =
        getCart();

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {
        cartCount.textContent = count;
    }

}


// Logout

function logoutUser() {

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "../login.html";

}


// Initialize

displayOrder();

updateCartCount();