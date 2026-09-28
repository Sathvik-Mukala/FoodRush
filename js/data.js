let restaurants = [

    {
        id: 1,
        name: "Paradise Biryani",
        cuisine: "Biryani, Indian",
        rating: 4.5,
        deliveryTime: "30-40 min",
        deliveryFee: 40,
        offer: "20% OFF",
        address: "Hitech City, Hyderabad"
    },

    {
        id: 2,
        name: "Pizza Palace",
        cuisine: "Pizza, Italian",
        rating: 4.4,
        deliveryTime: "25-35 min",
        deliveryFee: 30,
        offer: "FREE DELIVERY",
        address: "Banjara Hills, Hyderabad"
    },

    {
        id: 3,
        name: "Burger House",
        cuisine: "Burgers, Fast Food",
        rating: 4.3,
        deliveryTime: "20-30 min",
        deliveryFee: 25,
        offer: "15% OFF",
        address: "Madhapur, Hyderabad"
    },

    {
        id: 4,
        name: "Dragon Wok",
        cuisine: "Chinese, Asian",
        rating: 4.2,
        deliveryTime: "30-40 min",
        deliveryFee: 35,
        offer: "₹100 OFF",
        address: "Kondapur, Hyderabad"
    },

    {
        id: 5,
        name: "South Spice",
        cuisine: "South Indian",
        rating: 4.6,
        deliveryTime: "20-30 min",
        deliveryFee: 20,
        offer: "10% OFF",
        address: "Secunderabad"
    },

    {
        id: 6,
        name: "Royal Kitchen",
        cuisine: "Indian, North Indian",
        rating: 4.1,
        deliveryTime: "35-45 min",
        deliveryFee: 40,
        offer: "15% OFF",
        address: "Jubilee Hills, Hyderabad"
    }

];


let foods = [

    {
        id: 101,
        restaurantId: 1,
        name: "Chicken Biryani",
        category: "Biryani",
        price: 249,
        rating: 4.7,
        vegetarian: false
    },

    {
        id: 102,
        restaurantId: 1,
        name: "Mutton Biryani",
        category: "Biryani",
        price: 329,
        rating: 4.8,
        vegetarian: false
    },

    {
        id: 103,
        restaurantId: 1,
        name: "Veg Biryani",
        category: "Biryani",
        price: 199,
        rating: 4.4,
        vegetarian: true
    },

    {
        id: 201,
        restaurantId: 2,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 249,
        rating: 4.5,
        vegetarian: true
    },

    {
        id: 202,
        restaurantId: 2,
        name: "Farmhouse Pizza",
        category: "Pizza",
        price: 349,
        rating: 4.6,
        vegetarian: true
    },

    {
        id: 301,
        restaurantId: 3,
        name: "Chicken Burger",
        category: "Burger",
        price: 199,
        rating: 4.4,
        vegetarian: false
    },

    {
        id: 302,
        restaurantId: 3,
        name: "Veg Burger",
        category: "Burger",
        price: 149,
        rating: 4.2,
        vegetarian: true
    },

    {
        id: 401,
        restaurantId: 4,
        name: "Chicken Noodles",
        category: "Chinese",
        price: 219,
        rating: 4.3,
        vegetarian: false
    },

    {
        id: 402,
        restaurantId: 4,
        name: "Veg Manchurian",
        category: "Chinese",
        price: 189,
        rating: 4.4,
        vegetarian: true
    },

    {
        id: 501,
        restaurantId: 5,
        name: "Masala Dosa",
        category: "South Indian",
        price: 99,
        rating: 4.7,
        vegetarian: true
    },

    {
        id: 502,
        restaurantId: 5,
        name: "Idli Sambar",
        category: "South Indian",
        price: 79,
        rating: 4.5,
        vegetarian: true
    },

    {
        id: 601,
        restaurantId: 6,
        name: "Butter Chicken",
        category: "Indian",
        price: 299,
        rating: 4.6,
        vegetarian: false
    },

    {
        id: 602,
        restaurantId: 6,
        name: "Paneer Butter Masala",
        category: "Indian",
        price: 249,
        rating: 4.5,
        vegetarian: true
    }

];


const coupons = [

    {
        code: "WELCOME50",
        type: "percentage",
        value: 50,
        minOrder: 299,
        maxDiscount: 150
    },

    {
        code: "FOOD20",
        type: "percentage",
        value: 20,
        minOrder: 300,
        maxDiscount: 100
    },

    {
        code: "FIRST100",
        type: "flat",
        value: 100,
        minOrder: 499,
        maxDiscount: 100
    }

];
// Load admin-updated data from localStorage
const savedRestaurants = localStorage.getItem("restaurants");
if (savedRestaurants) {
    try {
        restaurants = JSON.parse(savedRestaurants);
    } catch (error) {
        console.error("Invalid restaurant data");
    }
}

const savedFoods = localStorage.getItem("foods");
if (savedFoods) {
    try {
        foods = JSON.parse(savedFoods);
    } catch (error) {
        console.error("Invalid food data");
    }
}