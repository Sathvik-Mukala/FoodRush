// Landing page search

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            const search = searchInput.value.trim();

            if (search) {
                window.location.href =
                    `customer/restaurants.html?search=${encodeURIComponent(search)}`;
            }

        }

    });

}


// Search button
function searchFood() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    const search = input.value.trim();

    if (search) {
        window.location.href =
            `customer/restaurants.html?search=${encodeURIComponent(search)}`;
    }

}


// Category click
function searchCategory(category) {

    window.location.href =
        `customer/restaurants.html?search=${encodeURIComponent(category)}`;
}


// Go to restaurants
function goToRestaurants() {

    window.location.href =
        "customer/restaurants.html";

}