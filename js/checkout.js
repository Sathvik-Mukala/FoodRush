// Check login

const currentUser = getCurrentUser();

if (!currentUser) {

    window.location.href = "../login.html";

}


// Get cart

const cart = getCart();


// Redirect if empty

if (cart.length === 0) {

    alert("Your cart is empty.");

    window.location.href = "restaurants.html";

}


// Calculate subtotal

function calculateSubtotal() {

    return cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

}


// Calculate delivery fee

function calculateDeliveryFee() {

    if (cart.length === 0) {
        return 0;
    }

    const restaurant =
        restaurants.find(
            r => r.id === cart[0].restaurantId
        );

    return restaurant
        ? restaurant.deliveryFee
        : 0;

}


// For checkout, read coupon from cart page if available.
// If there is no coupon saved, discount is ₹0.

const checkoutDiscount =
    Number(
        localStorage.getItem("checkoutDiscount") || 0
    );


// Display customer information

function loadCustomerInfo() {

    document.getElementById("customerName")
        .value = currentUser.name || "";

    document.getElementById("customerPhone")
        .value = currentUser.phone || "";

}


// Display cart

function displayCheckoutItems() {

    const container =
        document.getElementById("checkoutItems");

    container.innerHTML = "";


    cart.forEach(item => {

        container.innerHTML += `

            <div class="checkout-item">

                <span class="checkout-item-name">
                    ${item.name}
                </span>

                <span class="checkout-item-quantity">
                    × ${item.quantity}
                </span>

                <strong>
                    ${formatCurrency(
                        item.price * item.quantity
                    )}
                </strong>

            </div>

        `;

    });


    const subtotal =
        calculateSubtotal();

    const delivery =
        calculateDeliveryFee();

    const total =
        subtotal +
        delivery -
        checkoutDiscount;


    document.getElementById(
        "checkoutSubtotal"
    ).textContent =
        formatCurrency(subtotal);


    document.getElementById(
        "checkoutDelivery"
    ).textContent =
        formatCurrency(delivery);


    document.getElementById(
        "checkoutDiscount"
    ).textContent =
        "- " + formatCurrency(checkoutDiscount);


    document.getElementById(
        "checkoutTotal"
    ).textContent =
        formatCurrency(
            Math.max(total, 0)
        );

}


// Place order

document.getElementById("checkoutForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "customerName"
            ).value.trim();


        const phone =
            document.getElementById(
                "customerPhone"
            ).value.trim();


        const house =
            document.getElementById(
                "house"
            ).value.trim();


        const street =
            document.getElementById(
                "street"
            ).value.trim();


        const city =
            document.getElementById(
                "city"
            ).value.trim();


        const pincode =
            document.getElementById(
                "pincode"
            ).value.trim();


        const instructions =
            document.getElementById(
                "instructions"
            ).value.trim();


        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;


        // Validation

        if (!/^\d{10}$/.test(phone)) {

            alert(
                "Please enter a valid 10-digit phone number."
            );

            return;

        }


        if (!/^\d{6}$/.test(pincode)) {

            alert(
                "Please enter a valid 6-digit PIN code."
            );

            return;

        }


        // Calculate final amount

        const subtotal =
            calculateSubtotal();

        const deliveryFee =
            calculateDeliveryFee();

        const total =
            subtotal +
            deliveryFee -
            checkoutDiscount;


        // Create order

        const order = {

            id: generateOrderId(),

            userId: currentUser.id,

            customerName: name,

            phone: phone,

            address: {

                house: house,

                street: street,

                city: city,

                pincode: pincode,

                instructions: instructions

            },

            items: [...cart],

            subtotal: subtotal,

            deliveryFee: deliveryFee,

            discount: checkoutDiscount,

            total: Math.max(total, 0),

            paymentMethod: payment,

            paymentStatus:
                payment === "COD"
                    ? "Pending"
                    : "Paid",

            status: "Placed",

            createdAt:
                new Date().toISOString()

        };


        // Get previous orders

        const orders =
            getData("orders", []);


        orders.push(order);


        // Save order

        saveData(
            "orders",
            orders
        );


        // Clear cart

        saveCart([]);


        // Clear coupon

        localStorage.removeItem(
            "checkoutDiscount"
        );


        // Save latest order

        saveData(
            "latestOrder",
            order
        );


        // Go to confirmation

        window.location.href =
            `order-success.html?id=${order.id}`;

    });


// Cart count

function updateCartCount() {

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

        cartCount.textContent =
            count;

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

loadCustomerInfo();

displayCheckoutItems();

updateCartCount();