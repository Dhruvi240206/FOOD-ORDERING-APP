let cart = {};

function inc(name, price) {
    if (!cart[name]) {
        cart[name] = { p: price, q: 0 };
    }

    cart[name].q++;

    saveCart();
    updateUI();
}

function dec(name) {
    if (!cart[name]) return;

    cart[name].q--;

    if (cart[name].q <= 0) {
        delete cart[name];
    }

    saveCart();
    updateUI();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateUI() {
    let totalCount = 0;

    for (let item in cart) {
        totalCount += cart[item].q;

        let el = document.getElementById(item);
        if (el) el.innerText = cart[item].q;
    }

    document.getElementById("count").innerText = totalCount;
}

function goCheckout() {
    if (Object.keys(cart).length === 0) {
        alert("Cart is empty!");
        return;
    }

    window.location.href = "checkout.html";
}