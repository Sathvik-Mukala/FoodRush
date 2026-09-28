const currentUser = getCurrentUser();

if (!currentUser) {
    window.location.href = "../login.html";
}

// Show user name
const welcomeName = document.getElementById("welcomeName");

if (welcomeName) {
    welcomeName.textContent = currentUser.name.split(" ")[0];
}

// Display restaurants
function displayRestaurants() {
    const container = document.getElementById("restaurantContainer");

    if (!container) return;

    container.innerHTML = "";

    restaurants.forEach(restaurant => {
        container.innerHTML += `
            <div class="restaurant-card">
                <div class="restaurant-image">
                    <span>🍽️</span>
                    <span class="offer-badge">${restaurant.offer}</span>
                </div>

                <div class="restaurant-info">
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.cuisine}</p>

                    <div class="restaurant-meta">
                        <span>⭐ ${restaurant.rating}</span>
                        <span>🕐 ${restaurant.deliveryTime}</span>
                    </div>

                    <p class="delivery-fee">
                        Delivery: ${formatCurrency(restaurant.deliveryFee)}
                    </p>

                    <button onclick="viewRestaurant(${restaurant.id})">
                        View Menu
                    </button>
                </div>
            </div>
        `;
    });
}

// Display popular food
function displayPopularFood() {
    const container = document.getElementById("foodContainer");

    if (!container) return;

    container.innerHTML = "";

    foods.slice(0, 8).forEach(food => {

        const restaurant = restaurants.find(
            r => r.id === food.restaurantId
        );

        container.innerHTML += `
            <div class="food-card">

                <div class="food-image">
                    <span>🍴</span>
                </div>

                <div class="food-info">
                    <h3>${food.name}</h3>

                    <p>${restaurant ? restaurant.name : ""}</p>

                    <div class="food-meta">
                        <span>⭐ ${food.rating}</span>
                        <span>${food.vegetarian ? "🌱 Veg" : "🍗 Non-Veg"}</span>
                    </div>

                    <div class="food-bottom">
                        <strong>${formatCurrency(food.price)}</strong>

                        <button onclick="addToCart(${food.id})">
                            + Add
                        </button>
                    </div>
                </div>

            </div>
        `;
    });
}

// View restaurant
function viewRestaurant(id) {
    window.location.href = `restaurant.html?id=${id}`;
}

// Add food to cart
function addToCart(foodId) {

    const food = foods.find(f => f.id === foodId);

    if (!food) return;

    let cart = getCart();

    const existingItem = cart.find(item => item.id === foodId);

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

    alert(`${food.name} added to cart`);
}

// Update cart count
function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartBadge = document.getElementById("cartCount");

    if (cartBadge) {
        cartBadge.textContent = count;
    }
}

// Search category
function searchCategory(category) {

    window.location.href =
        `restaurants.html?search=${encodeURIComponent(category)}`;
}

// Search bar
const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            const search = searchInput.value.trim();

            if (search) {
                window.location.href =
                    `restaurants.html?search=${encodeURIComponent(search)}`;
            }

        }

    });

}

// Go to restaurants
function goToRestaurants() {
    window.location.href = "restaurants.html";
}

// Logout
function logoutUser() {

    localStorage.removeItem("currentUser");

    window.location.href = "../login.html";
}

// Initialize
displayRestaurants();
displayPopularFood();
updateCartCount();