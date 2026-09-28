// Current applied coupon

let appliedCoupon = null;


// Display cart

function displayCart() {

    const cart = getCart();

    const container =
        document.getElementById("cartItems");

    const emptyCart =
        document.getElementById("emptyCart");

    const summary =
        document.getElementById("cartSummary");


    container.innerHTML = "";


    if (cart.length === 0) {

        emptyCart.style.display = "block";
        summary.style.display = "none";

        updateCartCount();

        return;
    }


    emptyCart.style.display = "none";
    summary.style.display = "block";


    cart.forEach(item => {

        const restaurant =
            restaurants.find(
                r => r.id === item.restaurantId
            );


        const itemTotal =
            item.price * item.quantity;


        container.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-image">
                    🍽️
                </div>


                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${restaurant ? restaurant.name : ""}
                    </p>

                    <span class="cart-item-price">
                        ${formatCurrency(item.price)}
                    </span>

                </div>


                <div class="quantity-control">

                    <button
                        onclick="decreaseQuantity(${item.id})"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${item.id})"
                    >
                        +
                    </button>

                </div>


                <strong>
                    ${formatCurrency(itemTotal)}
                </strong>


                <button
                    class="remove-btn"
                    onclick="removeItem(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;

    });


    updateSummary();

    updateCartCount();

}


// Increase quantity

function increaseQuantity(id) {

    let cart = getCart();

    const item =
        cart.find(
            item => item.id === id
        );


    if (item) {

        item.quantity++;

        saveCart(cart);

        displayCart();

    }

}


// Decrease quantity

function decreaseQuantity(id) {

    let cart = getCart();

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item) return;


    if (item.quantity > 1) {

        item.quantity--;

    } else {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    saveCart(cart);

    displayCart();

}


// Remove item

function removeItem(id) {

    let cart = getCart();


    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart(cart);

    displayCart();

}


// Calculate subtotal

function calculateSubtotal() {

    const cart = getCart();


    return cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

}


// Calculate delivery fee

function calculateDeliveryFee() {

    const cart = getCart();


    if (cart.length === 0) {
        return 0;
    }


    // Use the first restaurant's delivery fee

    const restaurant =
        restaurants.find(
            r => r.id === cart[0].restaurantId
        );


    return restaurant
        ? restaurant.deliveryFee
        : 0;

}


// Calculate discount

function calculateDiscount(subtotal) {

    if (!appliedCoupon) {
        return 0;
    }


    const coupon =
        appliedCoupon;


    if (subtotal < coupon.minOrder) {
        return 0;
    }


    if (coupon.type === "percentage") {

        return Math.min(
            subtotal * coupon.value / 100,
            coupon.maxDiscount
        );

    }


    if (coupon.type === "flat") {

        return coupon.value;

    }


    return 0;

}


// Update summary

function updateSummary() {

    const subtotal =
        calculateSubtotal();


    const deliveryFee =
        calculateDeliveryFee();


    const discount =
        calculateDiscount(subtotal);


    const total =
        subtotal +
        deliveryFee -
        discount;


    document.getElementById("subtotal")
        .textContent =
        formatCurrency(subtotal);


    document.getElementById("deliveryFee")
        .textContent =
        formatCurrency(deliveryFee);


    document.getElementById("discount")
        .textContent =
        "- " + formatCurrency(discount);


    document.getElementById("total")
        .textContent =
        formatCurrency(Math.max(total, 0));

}


// Apply coupon

function applyCoupon() {

    const input =
        document.getElementById("couponInput");


    const message =
        document.getElementById("couponMessage");


    const code =
        input.value
            .trim()
            .toUpperCase();


    const subtotal =
        calculateSubtotal();


    if (!code) {

        message.textContent =
            "Enter a coupon code.";

        message.style.color =
            "#d33";

        return;

    }


    const coupon =
        coupons.find(
            c => c.code === code
        );


    if (!coupon) {

        appliedCoupon = null;

        message.textContent =
            "Invalid coupon code.";

        message.style.color =
            "#d33";

        updateSummary();

        return;

    }


    if (subtotal < coupon.minOrder) {

        appliedCoupon = null;

        message.textContent =
            `Minimum order is ${formatCurrency(coupon.minOrder)}.`;

        message.style.color =
            "#d33";

        updateSummary();

        return;

    }


    appliedCoupon = coupon;


    const discount =
        calculateDiscount(subtotal);


    message.textContent =
        `${coupon.code} applied! You saved ${formatCurrency(discount)}.`;

    message.style.color =
        "#159447";


    updateSummary();

}


// Go to checkout

function goToCheckout() {

    const cart = getCart();


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    const subtotal =
        calculateSubtotal();


    const discount =
        calculateDiscount(subtotal);


    localStorage.setItem(
        "checkoutDiscount",
        discount
    );


    window.location.href =
        "checkout.html";

}


// Search

function searchFood() {

    const input =
        document.getElementById(
            "searchInput"
        );


    const search =
        input.value.trim();


    if (!search) return;


    window.location.href =
        `restaurants.html?search=${encodeURIComponent(search)}`;

}


// Go to restaurants

function goToRestaurants() {

    window.location.href =
        "restaurants.html";

}


// Cart count

function updateCartCount() {

    const cart = getCart();


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

displayCart();