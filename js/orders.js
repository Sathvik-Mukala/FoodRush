const currentUser = getCurrentUser();

if (!currentUser) {

    window.location.href =
        "../login.html";

}


// Get all orders

const allOrders =
    getData("orders", []);


// Only current user's orders

const userOrders =
    allOrders
        .filter(
            order =>
                order.userId === currentUser.id
        )
        .reverse();


// Display orders

function displayOrders() {

    const container =
        document.getElementById(
            "ordersList"
        );

    const noOrders =
        document.getElementById(
            "noOrders"
        );


    container.innerHTML = "";


    if (userOrders.length === 0) {

        noOrders.style.display =
            "block";

        return;

    }


    noOrders.style.display =
        "none";


    userOrders.forEach(order => {

        let itemsHTML = "";


        order.items.forEach(item => {

            itemsHTML += `

                <div class="order-item-row">

                    <span>
                        ${item.name}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ${formatCurrency(
                            item.price *
                            item.quantity
                        )}
                    </strong>

                </div>

            `;

        });


        const date =
            new Date(
                order.createdAt
            ).toLocaleString("en-IN");


        container.innerHTML += `

            <div class="order-card">

                <div class="order-card-top">

                    <div>

                        <div class="order-id">
                            Order ${order.id}
                        </div>

                        <small>
                            ${date}
                        </small>

                    </div>

                    <span class="order-status">
                        ${order.status}
                    </span>

                </div>


                <div class="order-items">

                    ${itemsHTML}

                </div>


                <div class="order-card-bottom">

                    <strong>
                        Total:
                        ${formatCurrency(order.total)}
                    </strong>


                    <div class="order-card-buttons">

                        <button
                            class="track-btn"
                            onclick="trackOrder('${order.id}')"
                        >
                            Track Order
                        </button>

                        <button
                            class="reorder-btn"
                            onclick="reorder('${order.id}')"
                        >
                            Reorder
                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


// Track order

function trackOrder(id) {

    window.location.href =
        `track-order.html?id=${id}`;

}


// Reorder

function reorder(id) {

    const order =
        userOrders.find(
            order => order.id === id
        );


    if (!order) return;


    let cart =
        getCart();


    order.items.forEach(item => {

        const existing =
            cart.find(
                cartItem =>
                    cartItem.id === item.id
            );


        if (existing) {

            existing.quantity +=
                item.quantity;

        } else {

            cart.push({
                ...item
            });

        }

    });


    saveCart(cart);


    alert(
        "Items added to your cart."
    );


    window.location.href =
        "cart.html";

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


    const badge =
        document.getElementById(
            "cartCount"
        );


    if (badge) {
        badge.textContent =
            count;
    }

}


// Shopping

function goShopping() {

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

displayOrders();

updateCartCount();