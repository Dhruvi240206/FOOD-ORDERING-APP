let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD ITEM (with quantity)
function addToCart(name, price) {
    let item = cart.find(i => i.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    saveCart();
    showToast(name + " added!");
}

// INCREASE QTY
function increaseQty(index) {
    cart[index].qty++;
    saveCart();
    loadCart();
}

// DECREASE QTY
function decreaseQty(index) {
    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    loadCart();
}

// SAVE
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCount();
}

// UPDATE CART COUNT
function updateCount() {
    let count = document.getElementById("count");
    if (count) {
        let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        count.innerText = totalItems;
    }
}

// LOAD CART UI
function loadCart() {
    let list = document.getElementById("cartList");
    let total = 0;

    if (!list) return;

    list.innerHTML = "";

    if (cart.length === 0) {
        list.innerHTML = "<h3>🛒 Cart is Empty 😢</h3>";
        document.getElementById("total").innerText = "";
        return;
    }

    cart.forEach((item, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <div>
                <b>${item.name}</b><br>
                ₹${item.price} x ${item.qty}
            </div>

            <div>
                <button onclick="decreaseQty(${index})">-</button>
                ${item.qty}
                <button onclick="increaseQty(${index})">+</button>
            </div>
        `;

        list.appendChild(li);

        total += item.price * item.qty;
    });

    let gst = total * 0.05;
    let delivery = 40;
    let finalTotal = total + gst + delivery;

    document.getElementById("total").innerHTML = `
        Subtotal: ₹${total} <br>
        GST (5%): ₹${gst.toFixed(2)} <br>
        Delivery: ₹${delivery} <br>
        <b>Total: ₹${finalTotal.toFixed(2)}</b>
    `;
}

// CHECKOUT
function checkout() {
    alert("🎉 Order Placed Successfully!");
    localStorage.removeItem("cart");
    window.location.href = "menu.html";
}

// TOAST
function showToast(msg) {
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = msg;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => toast.remove(), 2000);
}

// LOGOUT
function logout() {
    localStorage.removeItem("user");
}

// INIT
updateCount();