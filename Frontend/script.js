let cart = JSON.parse(localStorage.getItem("cart")) || [];

// MENU DATA
const menuItems = [
    {name: "Burger", price: 100, img: "images/burger.jpeg"},
    {name: "Pizza", price: 200, img: "images/pizza.jpeg"},
    {name: "Pasta", price: 150, img: "images/pasta.jpeg"},
    {name: "Sandwich", price: 80, img: "images/sandwich.jpeg"},
    {name: "French Fries", price: 70, img: "images/fries.jpeg"},
    {name: "Cold Drink", price: 50, img: "images/drink.jpeg"},
    {name: "Momos", price: 120, img: "images/momos.jpeg"},
    {name: "Noodles", price: 130, img: "images/noodles.jpeg"}
];

// LOAD MENU
if (document.getElementById("menu")) {
    let div = document.getElementById("menu");

    menuItems.forEach((item, i) => {
        let itemDiv = document.createElement("div");
        itemDiv.className = "menu-item";

        itemDiv.innerHTML = `
            <img src="${item.img}">
            <h3>${item.name}</h3>
            <p class="price">₹${item.price}</p>
            <button onclick="addToCart(${i})">Add</button>
        `;

        div.appendChild(itemDiv);
    });
}

// ADD TO CART
function addToCart(i) {
    cart.push(menuItems[i]);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    showToast("Added to cart!");
}

// CART COUNT
function updateCartCount() {
    let count = cart.length;
    let el = document.getElementById("cart-count");
    if (el) el.innerText = "🛒 " + count;
}

updateCartCount();

// SEARCH
function searchFood() {
    let value = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll(".menu-item");

    items.forEach(item => {
        let name = item.querySelector("h3").innerText.toLowerCase();
        item.style.display = name.includes(value) ? "block" : "none";
    });
}

// TOAST
function showToast(msg) {
    let toast = document.createElement("div");
    toast.innerText = msg;
    toast.className = "toast";

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2000);
}