const currentUser = getCurrentUser();

if (!currentUser) {
    window.location.href = "../login.html";
}


// Display favorites

function displayFavorites() {

    const favoriteIds =
        getFavorites();

    const container =
        document.getElementById(
            "favoritesList"
        );

    const noFavorites =
        document.getElementById(
            "noFavorites"
        );


    container.innerHTML = "";


    const favoriteRestaurants =
        restaurants.filter(
            restaurant =>
                favoriteIds.includes(
                    restaurant.id
                )
        );


    if (favoriteRestaurants.length === 0) {

        noFavorites.style.display =
            "block";

        return;

    }


    noFavorites.style.display =
        "none";


    favoriteRestaurants.forEach(
        restaurant => {

            container.innerHTML += `

                <div class="restaurant-card">

                    <div class="restaurant-image">

                        <span>
                            🍽️
                        </span>

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
                            ${formatCurrency(
                                restaurant.deliveryFee
                            )}
                        </p>


                        <button
                            onclick="viewRestaurant(${restaurant.id})"
                        >
                            View Menu
                        </button>


                        <button
                            class="remove-favorite-btn"
                            onclick="removeFavorite(${restaurant.id})"
                        >
                            ♥ Remove Favorite
                        </button>

                    </div>

                </div>

            `;

        }
    );

}


// Remove favorite

function removeFavorite(id) {

    let favorites =
        getFavorites();


    favorites =
        favorites.filter(
            favoriteId =>
                favoriteId !== id
        );


    saveFavorites(
        favorites
    );


    displayFavorites();

}


// View restaurant

function viewRestaurant(id) {

    window.location.href =
        `restaurant.html?id=${id}`;

}


// Browse restaurants

function browseRestaurants() {

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


    document.getElementById(
        "cartCount"
    ).textContent = count;

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

displayFavorites();

updateCartCount();