const currentUser = getCurrentUser();

if (!currentUser) {

    window.location.href =
        "../login.html";

}


// Load profile

function loadProfile() {

    document.getElementById(
        "profileName"
    ).textContent =
        currentUser.name;


    document.getElementById(
        "profileEmail"
    ).textContent =
        currentUser.email;


    document.getElementById(
        "name"
    ).value =
        currentUser.name;


    document.getElementById(
        "email"
    ).value =
        currentUser.email;


    document.getElementById(
        "phone"
    ).value =
        currentUser.phone || "";


    updateStats();

}


// Update statistics

function updateStats() {

    const orders =
        getData("orders", []);


    const userOrders =
        orders.filter(
            order =>
                order.userId === currentUser.id
        );


    const favorites =
        getFavorites();


    document.getElementById(
        "orderCount"
    ).textContent =
        userOrders.length;


    document.getElementById(
        "favoriteCount"
    ).textContent =
        favorites.length;


    const cart =
        getCart();


    const cartCount =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    document.getElementById(
        "cartCount"
    ).textContent =
        cartCount;

}


// Save profile

document.getElementById(
    "profileForm"
).addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            ).value.trim();


        const phone =
            document.getElementById(
                "phone"
            ).value.trim();


        const message =
            document.getElementById(
                "profileMessage"
            );


        if (!name) {

            message.textContent =
                "Please enter your name.";

            message.style.color =
                "#d33";

            return;

        }


        if (!/^\d{10}$/.test(phone)) {

            message.textContent =
                "Please enter a valid 10-digit phone number.";

            message.style.color =
                "#d33";

            return;

        }


        // Update user

        const users =
            getData("users", []);


        const userIndex =
            users.findIndex(
                user =>
                    user.id === currentUser.id
            );


        if (userIndex !== -1) {

            users[userIndex].name =
                name;

            users[userIndex].phone =
                phone;


            saveData(
                "users",
                users
            );

        }


        // Update current user

        currentUser.name =
            name;

        currentUser.phone =
            phone;


        saveData(
            "currentUser",
            currentUser
        );


        document.getElementById(
            "profileName"
        ).textContent =
            name;


        message.textContent =
            "Profile updated successfully.";

        message.style.color =
            "#159447";

    }
);


// Logout

function logoutUser() {

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "../login.html";

}


// Initialize

loadProfile();