// Get restaurant ID from URL

const urlParams = new URLSearchParams(
    window.location.search
);

const restaurantId =
    Number(urlParams.get("id"));


// Find restaurant

const restaurant =
    restaurants.find(
        r => r.id === restaurantId
    );


// If restaurant doesn't exist

if (!restaurant) {

    alert("Restaurant not found");

    window.location.href =
        "restaurants.html";
}


// Get restaurant foods

let restaurantFoods =
    foods.filter(
        food => food.restaurantId === restaurantId
    );


// Selected category

let selectedCategory = "All";


// Display restaurant information

function displayRestaurantInfo() {

    document.getElementById("restaurantName")
        .textContent = restaurant.name;

    document.getElementById("restaurantCuisine")
        .textContent = restaurant.cuisine;

    document.getElementById("restaurantAddress")
        .textContent =
        "📍 " + restaurant.address;


    document.getElementById("restaurantMeta")
        .innerHTML = `

            <span>
                ⭐ ${restaurant.rating}
            </span>

            &nbsp;&nbsp;

            <span>
                🕐 ${restaurant.deliveryTime}
            </span>

            &nbsp;&nbsp;

            <span>
                🚚 Delivery ${formatCurrency(restaurant.deliveryFee)}
            </span>

        `;


    document.getElementById("menuTitle")
        .textContent =
        `${restaurant.name} Menu`;

}


// Display categories

function displayCategories() {

    const categoryList =
        document.getElementById("categoryList");

    const categories = [
        ...new Set(
            restaurantFoods.map(
                food => food.category
            )
        )
    ];


    categoryList.innerHTML = "";


    categories.forEach(category => {

        categoryList.innerHTML += `

            <label>

                <input
                    type="radio"
                    name="foodCategory"
                    value="${category}"
                >

                ${category}

            </label>

        `;

    });


    document
        .querySelectorAll(
            'input[name="foodCategory"]'
        )
        .forEach(input => {

            input.addEventListener(
                "change",
                function () {

                    selectedCategory =
                        this.value;

                    displayFoods();

                }
            );

        });

}


// Display food items

function displayFoods() {

    const container =
        document.getElementById("foodList");

    const noFood =
        document.getElementById("noFood");

    let filteredFoods =
        restaurantFoods;


    if (selectedCategory !== "All") {

        filteredFoods =
            restaurantFoods.filter(
                food =>
                    food.category === selectedCategory
            );

    }


    container.innerHTML = "";


    document.getElementById("foodCount")
        .textContent =
        `${filteredFoods.length} item${filteredFoods.length !== 1 ? "s" : ""}`;


    if (filteredFoods.length === 0) {

        noFood.style.display = "block";

        return;

    }


    noFood.style.display = "none";


    filteredFoods.forEach(food => {

        container.innerHTML += `

            <div class="restaurant-card">

                <div class="restaurant-image">

                    <span>
                        ${food.vegetarian ? "🥗" : "🍗"}
                    </span>

                    <span class="offer-badge">
                        ${food.vegetarian ? "VEG" : "NON-VEG"}
                    </span>

                </div>


                <div class="restaurant-info">

                    <h3>
                        ${food.name}
                    </h3>

                    <p>
                        ${food.category}
                    </p>


                    <div class="restaurant-meta">

                        <span>
                            ⭐ ${food.rating}
                        </span>

                        <span>
                            ${food.vegetarian ? "🌱 Veg" : "🍗 Non-Veg"}
                        </span>

                    </div>


                    <div class="food-price-row">

                        <strong>
                            ${formatCurrency(food.price)}
                        </strong>

                        <button
                            onclick="addToCart(${food.id})"
                        >
                            + Add
                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


// Add food to cart

function addToCart(foodId) {

    const food =
        foods.find(
            f => f.id === foodId
        );


    if (!food) return;


    let cart = getCart();


    const existingItem =
        cart.find(
            item => item.id === foodId
        );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: food.id,

            name: food.name,

            price: food.price,

            quantity: 1,

            restaurantId: food.restaurantId,

            category: food.category

        });

    }


    saveCart(cart);


    updateCartCount();


    alert(
        `${food.name} added to cart`
    );

}


// Update cart count

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

        cartCount.textContent =
            count;

    }

}


// Favorites

function toggleFavorite() {

    let favorites =
        getFavorites();


    const index =
        favorites.indexOf(
            restaurant.id
        );


    if (index === -1) {

        favorites.push(
            restaurant.id
        );

        alert(
            `${restaurant.name} added to favorites`
        );

    } else {

        favorites.splice(
            index,
            1
        );

        alert(
            `${restaurant.name} removed from favorites`
        );

    }


    saveFavorites(favorites);

    updateFavoriteButton();

}


// Update favorite button

function updateFavoriteButton() {

    const favorites =
        getFavorites();


    const button =
        document.getElementById(
            "favoriteButton"
        );


    if (
        favorites.includes(
            restaurant.id
        )
    ) {

        button.textContent =
            "♥ Favorited";

    } else {

        button.textContent =
            "♡ Favorite";

    }

}


// Search food

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


// Logout

function logoutUser() {

    localStorage.removeItem(
        "currentUser"
    );


    window.location.href =
        "../login.html";

}


// Initialize

displayRestaurantInfo();

displayCategories();

displayFoods();

updateCartCount();

updateFavoriteButton();