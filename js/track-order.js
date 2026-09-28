// Check login

const currentUser = getCurrentUser();

if (!currentUser) {

    window.location.href =
        "../login.html";

}


// Get order ID

const params =
    new URLSearchParams(
        window.location.search
    );

const orderId =
    params.get("id");


// Get orders

const orders =
    getData("orders", []);


// Find order

const order =
    orders.find(
        item =>
            item.id === orderId &&
            item.userId === currentUser.id
    );


// Check order

if (!order) {

    alert("Order not found.");

    window.location.href =
        "orders.html";

}


// Find restaurant

const restaurant =
    restaurants.find(
        r =>
            r.id === order.items[0].restaurantId
    );


// Status sequence

const statuses = [
    "Placed",
    "Preparing",
    "Out for Delivery",
    "Delivered"
];


// Display basic information

function displayTrackingInfo() {

    document.getElementById(
        "trackingOrderId"
    ).textContent =
        `Order ${order.id}`;


    document.getElementById(
        "trackingRestaurant"
    ).textContent =
        restaurant
            ? restaurant.name
            : "FoodRush Restaurant";


    document.getElementById(
        "trackingSubtitle"
    ).textContent =
        `Order from ${
            restaurant
                ? restaurant.name
                : "FoodRush"
        }`;


    document.getElementById(
        "currentStatus"
    ).textContent =
        order.status;


    const address =
        order.address;


    document.getElementById(
        "trackingAddress"
    ).textContent =
        `${address.house}, ${address.street}, ${address.city} - ${address.pincode}`;


    document.getElementById(
        "trackingPayment"
    ).textContent =
        order.paymentMethod === "COD"
            ? "Cash on Delivery"
            : order.paymentMethod;


    document.getElementById(
        "trackingTotal"
    ).textContent =
        formatCurrency(order.total);

}


// Update timeline

function updateTimeline() {

    let currentIndex =
        statuses.indexOf(order.status);


    // Safety fallback

    if (currentIndex < 0) {
        currentIndex = 0;
    }


    for (
        let i = 0;
        i < statuses.length;
        i++
    ) {

        const step =
            document.getElementById(
                `step${i + 1}`
            );


        if (i < currentIndex) {

            step.classList.add(
                "completed"
            );

        }


        else if (i === currentIndex) {

            step.classList.add(
                "active"
            );

        }

    }


    for (
        let i = 1;
        i <= 3;
        i++
    ) {

        if (i <= currentIndex) {

            document
                .getElementById(
                    `line${i}`
                )
                .classList.add(
                    "active"
                );

        }

    }

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


    document.getElementById(
        "cartCount"
    ).textContent = count;

}


// Navigation

function goToOrders() {

    window.location.href =
        "orders.html";

}


function continueShopping() {

    window.location.href =
        "restaurants.html";

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

displayTrackingInfo();

updateTimeline();

updateCartCount();