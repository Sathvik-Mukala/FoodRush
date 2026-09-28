const currentUser = getCurrentUser();

if (!currentUser || currentUser.role !== "admin") {
    window.location.href = "../login.html";
}

const form = document.getElementById("restaurantForm");
const table = document.getElementById("restaurantTable");

function renderRestaurants() {

    table.innerHTML = "";

    restaurants.forEach(restaurant => {

        table.innerHTML += `
            <tr>

                <td>${restaurant.name}</td>

                <td>${restaurant.cuisine}</td>

                <td>${restaurant.rating}</td>

                <td>${restaurant.deliveryTime}</td>

                <td>${formatCurrency(restaurant.deliveryFee)}</td>

                <td>${restaurant.offer}</td>

                <td>
                    <button class="edit-btn"
                        onclick="editRestaurant(${restaurant.id})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteRestaurant(${restaurant.id})">
                        Delete
                    </button>
                </td>

            </tr>
        `;
    });
}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const id = document.getElementById("restaurantId").value;

    const restaurantData = {
        id: id ? Number(id) : Date.now(),
        name: document.getElementById("name").value.trim(),
        cuisine: document.getElementById("cuisine").value.trim(),
        rating: Number(document.getElementById("rating").value),
        deliveryTime: document.getElementById("deliveryTime").value.trim(),
        deliveryFee: Number(document.getElementById("deliveryFee").value),
        offer: document.getElementById("offer").value.trim(),
        address: document.getElementById("address").value.trim()
    };

    if (id) {

        const index = restaurants.findIndex(
            restaurant => restaurant.id === Number(id)
        );

        restaurants[index] = restaurantData;

    } else {

        restaurants.push(restaurantData);

    }

    saveData("restaurants", restaurants);

    renderRestaurants();

    resetForm();

    alert(id ? "Restaurant updated." : "Restaurant added.");
});

function editRestaurant(id) {

    const restaurant = restaurants.find(
        restaurant => restaurant.id === id
    );

    if (!restaurant) return;

    document.getElementById("restaurantId").value = restaurant.id;
    document.getElementById("name").value = restaurant.name;
    document.getElementById("cuisine").value = restaurant.cuisine;
    document.getElementById("rating").value = restaurant.rating;
    document.getElementById("deliveryTime").value = restaurant.deliveryTime;
    document.getElementById("deliveryFee").value = restaurant.deliveryFee;
    document.getElementById("offer").value = restaurant.offer;
    document.getElementById("address").value = restaurant.address;

    document.getElementById("formTitle").textContent =
        "Edit Restaurant";

    document.getElementById("cancelBtn").style.display =
        "inline-block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function deleteRestaurant(id) {

    const restaurant = restaurants.find(
        restaurant => restaurant.id === id
    );

    if (!restaurant) return;

    if (!confirm(`Delete ${restaurant.name}?`)) return;

    restaurants = restaurants.filter(
        restaurant => restaurant.id !== id
    );

    // Also remove its menu items
    foods = foods.filter(
        food => food.restaurantId !== id
    );

    saveData("restaurants", restaurants);
    saveData("foods", foods);

    renderRestaurants();

    alert("Restaurant deleted.");
}

function resetForm() {

    form.reset();

    document.getElementById("restaurantId").value = "";

    document.getElementById("formTitle").textContent =
        "Add Restaurant";

    document.getElementById("cancelBtn").style.display =
        "none";
}

function logoutAdmin() {

    localStorage.removeItem("currentUser");

    window.location.href = "../login.html";
}

renderRestaurants();