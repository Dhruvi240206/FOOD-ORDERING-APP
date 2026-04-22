let cart = JSON.parse(localStorage.getItem("cart")) || {};

let list = document.getElementById("list");
let total = 0;

// CLEAR OLD UI
list.innerHTML = "";

for (let name in cart) {
    let item = cart[name];

    // SAFE CHECK (fixes undefined bug)
    if (!item || !item.q || !item.p) continue;

    let li = document.createElement("li");

    li.innerText = `${name} x${item.q} = ₹${item.q * item.p}`;

    list.appendChild(li);

    total += item.q * item.p;
}

document.getElementById("total").innerText = total;

function order() {
    let addr = document.getElementById("addr").value;

    if (!addr) {
        alert("Enter address!");
        return;
    }

    alert("🎉 Order placed successfully!");

    localStorage.removeItem("cart");

    window.location.href = "menu.html";
}