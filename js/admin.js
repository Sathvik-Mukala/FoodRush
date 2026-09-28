// Check admin login

const currentUser = getCurrentUser();

if (
    !currentUser ||
    currentUser.role !== "admin"
) {

    window.location.href =
        "../login.html";

}


// Get users

function getCustomers() {

    const users =
        getData("users", []);

    return users.filter(
        user => user.role === "customer"
    );

}


// Display statistics

function displayStats() {

    const orders =
        getData("orders", []);

    const customers =
        getCustomers();


    document.getElementById(
        "restaurantCount"
    ).textContent =
        restaurants.length;


    document.getElementById(
        "foodCount"
    ).textContent =
        foods.length;


    document.getElementById(
        "customerCount"
    ).textContent =
        customers.length;


    document.getElementById(
        "orderCount"
    ).textContent =
        orders.length;


    const revenue =
        orders.reduce(
            (total, order) =>
                total + Number(order.total),
            0
        );


    document.getElementById(
        "totalRevenue"
    ).textContent =
        formatCurrency(revenue);

}


// Display recent orders

function displayRecentOrders() {

    const orders =
        getData("orders", []);


    const container =
        document.getElementById(
            "recentOrders"
        );


    container.innerHTML = "";


    const recentOrders =
        [...orders]
            .reverse()
            .slice(0, 5);


    if (recentOrders.length === 0) {

        container.innerHTML = `
            <div class="recent-order">
                <span>No orders yet.</span>
            </div>
        `;

        return;

    }


    recentOrders.forEach(order => {

        container.innerHTML += `

            <div class="recent-order">

                <div class="recent-order-info">

                    <strong>
                        ${order.id}
                    </strong>

                    <span>
                        ${order.customerName}
                        •
                        ${order.status}
                    </span>

                </div>


                <div class="recent-order-total">

                    ${formatCurrency(
                        order.total
                    )}

                </div>

            </div>

        `;

    });

}


// Logout

function logoutAdmin() {

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "../login.html";

}


// Initialize

displayStats();

displayRecentOrders();