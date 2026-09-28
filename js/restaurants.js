let filteredRestaurants = [...restaurants];


// Get search from URL

const urlParams = new URLSearchParams(window.location.search);

const searchQuery = urlParams.get("search");


// Search restaurants

function searchRestaurants() {

    const input = document.getElementById("searchInput");

    const search = input.value.trim();

    const url =
        search
            ? `restaurants.html?search=${encodeURIComponent(search)}`
            : "restaurants.html";

    window.location.href = url;
}


// Display restaurants

function displayRestaurants() {

    const container =
        document.getElementById("restaurantList");

    const noResults =
        document.getElementById("noResults");

    const resultCount =
        document.getElementById("resultCount");

    container.innerHTML = "";

    resultCount.textContent =
        `${filteredRestaurants.length} restaurant${filteredRestaurants.length !== 1 ? "s" : ""} found`;


    if (filteredRestaurants.length === 0) {

        noResults.style.display = "block";

        return;

    }

    noResults.style.display = "none";


    filteredRestaurants.forEach(restaurant => {

        container.innerHTML += `

            <div class="restaurant-card">

                <div class="restaurant-image">

                    <span>🍽️</span>

                    <span class="offer-badge">
                        ${restaurant.offer}
                    </span>

                </div>


                <div class="restaurant-info">

                    <h3>
                        ${restaurant.name}
                    </h3>

                    <p>
                        ${restaurant.cuisine}
                    </p>


                    <div class="restaurant-meta">

                        <span>
                            ⭐ ${restaurant.rating}
                        </span>

                        <span>
                            🕐 ${restaurant.deliveryTime}
                        </span>

                    </div>


                    <p class="delivery-fee">
                        Delivery:
                        ${formatCurrency(restaurant.deliveryFee)}
                    </p>


                    <button
                        onclick="viewRestaurant(${restaurant.id})"
                    >
                        View Menu
                    </button>

                </div>

            </div>

        `;

    });

}


// Apply filters

function applyFilters() {

    const selectedCategory =
        document.querySelector(
            'input[name="category"]:checked'
        ).value;

    const selectedRating =
        Number(
            document.querySelector(
                'input[name="rating"]:checked'
            ).value
        );

    const selectedTime =
        Number(
            document.querySelector(
                'input[name="time"]:checked'
            ).value
        );


    const search =
        searchQuery
            ? searchQuery.toLowerCase()
            : "";


    filteredRestaurants =
        restaurants.filter(restaurant => {

            // Search filter

            const matchesSearch =
                !search ||
                restaurant.name
                    .toLowerCase()
                    .includes(search) ||
                restaurant.cuisine
                    .toLowerCase()
                    .includes(search);


            // Category filter

            const matchesCategory =
                selectedCategory === "All" ||
                restaurant.cuisine
                    .toLowerCase()
                    .includes(
                        selectedCategory.toLowerCase()
                    );


            // Rating filter

            const matchesRating =
                restaurant.rating >= selectedRating;


            // Delivery time filter

            const minimumTime =
                parseInt(
                    restaurant.deliveryTime
                );

            const matchesTime =
                selectedTime === 0 ||
                minimumTime <= selectedTime;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesRating &&
                matchesTime
            );

        });


    applySorting();

    displayRestaurants();

}


// Sorting

function applySorting() {

    const sort =
        document.getElementById("sortSelect").value;


    if (sort === "rating") {

        filteredRestaurants.sort(
            (a, b) => b.rating - a.rating
        );

    }


    else if (sort === "delivery") {

        filteredRestaurants.sort(
            (a, b) =>
                parseInt(a.deliveryTime) -
                parseInt(b.deliveryTime)
        );

    }


    else if (sort === "fee") {

        filteredRestaurants.sort(
            (a, b) =>
                a.deliveryFee -
                b.deliveryFee
        );

    }

}


// View restaurant

function viewRestaurant(id) {

    window.location.href =
        `restaurant.html?id=${id}`;

}


// Clear filters

function clearFilters() {

    document.querySelector(
        'input[name="category"][value="All"]'
    ).checked = true;


    document.querySelector(
        'input[name="rating"][value="0"]'
    ).checked = true;


    document.querySelector(
        'input[name="time"][value="0"]'
    ).checked = true;


    document.getElementById("sortSelect").value =
        "default";


    window.history.replaceState(
        {},
        "",
        "restaurants.html"
    );


    filteredRestaurants =
        [...restaurants];


    displayRestaurants();

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
        document.getElementById("cartCount");


    if (cartCount) {
        cartCount.textContent = count;
    }

}


// Logout

function logoutUser() {

    localStorage.removeItem("currentUser");

    window.location.href =
        "../login.html";

}


// Event listeners

document
    .querySelectorAll(
        'input[name="category"], input[name="rating"], input[name="time"]'
    )
    .forEach(input => {

        input.addEventListener(
            "change",
            applyFilters
        );

    });


document
    .getElementById("sortSelect")
    .addEventListener(
        "change",
        applyFilters
    );


// Put search text into search box

if (searchQuery) {

    document.getElementById("searchInput").value =
        searchQuery;

    document.getElementById("resultTitle").textContent =
        `Search results for "${searchQuery}"`;

}


// Initial load

applyFilters();

updateCartCount();