const cart = JSON.parse(localStorage.getItem("cart")) || [];
const summary = document.getElementById("summary");
const totalEl = document.getElementById("total");

let total = 0;

cart.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `${item.name} x${item.qty} = ₹${item.price * item.qty}`;
    summary.appendChild(div);

    total += item.price * item.qty;
});

totalEl.innerText = total;

function placeOrder() {
    const address = document.getElementById("address").value;

    if (!address) {
        alert("Please enter address!");
        return;
    }

    const order = {
        id: Date.now(),
        items: cart,
        total: total,
        status: "Placed"
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    alert("Order placed successfully 🎉");

    window.location.href = "orders.html";
}