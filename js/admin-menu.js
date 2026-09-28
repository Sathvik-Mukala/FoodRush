const currentUser = getCurrentUser();

if (!currentUser || currentUser.role !== "admin") {
    window.location.href = "../login.html";
}

const form = document.getElementById("foodForm");
const table = document.getElementById("foodTable");
const restaurantSelect = document.getElementById("restaurantId");

function loadRestaurants() {

    restaurantSelect.innerHTML =
        `<option value="">Select Restaurant</option>`;

    restaurants.forEach(restaurant => {

        restaurantSelect.innerHTML += `
            <option value="${restaurant.id}">
                ${restaurant.name}
            </option>
        `;
    });
}

function renderFoods() {

    table.innerHTML = "";

    foods.forEach(food => {

        const restaurant = restaurants.find(
            r => r.id === food.restaurantId
        );

        table.innerHTML += `
            <tr>

                <td>${food.name}</td>

                <td>${restaurant ? restaurant.name : "Unknown"}</td>

                <td>${food.category}</td>

                <td>${formatCurrency(food.price)}</td>

                <td>${food.rating}</td>

                <td>
                    ${food.vegetarian ? "Vegetarian" : "Non-Veg"}
                </td>

                <td>

                    <button class="edit-btn"
                        onclick="editFood(${food.id})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteFood(${food.id})">
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });
}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const id = document.getElementById("foodId").value;

    const foodData = {

        id: id ? Number(id) : Date.now(),

        restaurantId:
            Number(document.getElementById("restaurantId").value),

        name:
            document.getElementById("name").value.trim(),

        category:
            document.getElementById("category").value.trim(),

        price:
            Number(document.getElementById("price").value),

        rating:
            Number(document.getElementById("rating").value),

        vegetarian:
            document.getElementById("vegetarian").value === "true"
    };

    if (id) {

        const index = foods.findIndex(
            food => food.id === Number(id)
        );

        foods[index] = foodData;

    } else {

        foods.push(foodData);

    }

    saveData("foods", foods);

    renderFoods();

    resetForm();

    alert(id ? "Menu item updated." : "Menu item added.");
});

function editFood(id) {

    const food = foods.find(
        food => food.id === id
    );

    if (!food) return;

    document.getElementById("foodId").value = food.id;

    document.getElementById("restaurantId").value =
        food.restaurantId;

    document.getElementById("name").value =
        food.name;

    document.getElementById("category").value =
        food.category;

    document.getElementById("price").value =
        food.price;

    document.getElementById("rating").value =
        food.rating;

    document.getElementById("vegetarian").value =
        String(food.vegetarian);

    document.getElementById("formTitle").textContent =
        "Edit Menu Item";

    document.getElementById("cancelBtn").style.display =
        "inline-block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function deleteFood(id) {

    const food = foods.find(
        food => food.id === id
    );

    if (!food) return;

    if (!confirm(`Delete ${food.name}?`)) return;

    foods = foods.filter(
        food => food.id !== id
    );

    saveData("foods", foods);

    renderFoods();

    alert("Menu item deleted.");
}

function resetForm() {

    form.reset();

    document.getElementById("foodId").value = "";

    document.getElementById("formTitle").textContent =
        "Add Menu Item";

    document.getElementById("cancelBtn").style.display =
        "none";
}

function logoutAdmin() {

    localStorage.removeItem("currentUser");

    window.location.href = "../login.html";
}

loadRestaurants();
renderFoods();