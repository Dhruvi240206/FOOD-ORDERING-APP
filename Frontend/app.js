let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

const foods = [
 {name:"Burger", price:1200, img:"images/burger.jpeg"},
 {name:"Pizza", price:1900, img:"images/pizza.jpeg"},
 {name:"Pasta", price:1200, img:"images/pasta.jpeg"},
 {name:"Fries", price:980, img:"images/fries.jpeg"},
 {name:"Momos", price:2500, img:"images/momos.jpeg"},
 {name:"Noodles", price:1900, img:"images/noodles.jpeg"}
];

function save(){
 localStorage.setItem("cart", JSON.stringify(cart));
 localStorage.setItem("orders", JSON.stringify(orders));
}

function updateCartCount(){
 let count = cart.reduce((s,i)=>s+i.qty,0);
 let el = document.getElementById("cartCount");
 if(el) el.innerText = count;
}

/* LOADER */
function showLoader(){ document.getElementById("loader").style.display="flex"; }
function hideLoader(){ document.getElementById("loader").style.display="none"; }

/* TOAST */
function showToast(msg,type="success"){
 let t=document.getElementById("toast");
 t.innerText=msg;
 t.className="toast show "+type;
 setTimeout(()=>t.className="toast",3000);
}

/* MENU */
function addItem(food){
 showLoader();
 setTimeout(()=>{
  let item=cart.find(i=>i.name===food.name);
  if(item) item.qty++;
  else cart.push({...food,qty:1});
  save();
  renderMenu();
  updateCartCount();
  hideLoader();
  showToast(food.name+" added 🛒");
 },300);
}

function removeItem(food){
 let item=cart.find(i=>i.name===food.name);
 if(item){
  item.qty--;
  if(item.qty<=0) cart=cart.filter(i=>i.name!==food.name);
  save();
  renderMenu();
  updateCartCount();
  showToast(food.name+" removed","error");
 }
}

function renderMenu(){
 let menu=document.getElementById("menu");
 if(!menu) return;
 menu.innerHTML="";
 foods.forEach(f=>{
  let item=cart.find(i=>i.name===f.name);
  let qty=item?item.qty:0;
  menu.innerHTML+=`
  <div class="food-card fade">
    <img src="${f.img}">
    <h3>${f.name}</h3>
    <p class="price">₹${f.price}</p>
    <div class="controls">
      <button onclick='removeItem(${JSON.stringify(f)})'>−</button>
      <span>${qty}</span>
      <button onclick='addItem(${JSON.stringify(f)})'>+</button>
    </div>
  </div>`;
 });
}

/* CART */
function renderCart(){
 let div=document.getElementById("cart");
 let total=0;
 div.innerHTML="";
 cart.forEach(i=>{
  total+=i.price*i.qty;
  div.innerHTML+=`<div class="order-card">${i.name} x ${i.qty} = ₹${i.price*i.qty}</div>`;
 });
 document.getElementById("total").innerText="Total ₹"+total;
}

/* CHECKOUT */
function renderCheckout(){
 let total=cart.reduce((s,i)=>s+i.price*i.qty,0);
 document.getElementById("total").innerText="Total ₹"+total;
}

function placeOrder(){
 let address=document.getElementById("address").value;
 if(!address){ showToast("Enter address","error"); return;}
 showLoader();
 setTimeout(()=>{
 let total=cart.reduce((s,i)=>s+i.price*i.qty,0);
 orders.push({
  items:JSON.parse(JSON.stringify(cart)),
  total,address,
  payment:document.getElementById("payment").value,
  date:new Date().toLocaleString()
 });
 cart=[];
 save();
 hideLoader();
 showToast("Order placed 🎉");
 setTimeout(()=>window.location.href="orders.html",1000);
 },800);
}

/* ORDERS */
function renderOrders(){
 let div=document.getElementById("orders");
 div.innerHTML="";
 if(orders.length===0){div.innerHTML="No orders";return;}
 orders.forEach(o=>{
  let items="";
  o.items.forEach(i=>items+=`<li>${i.name} x ${i.qty}</li>`);
  div.innerHTML+=`
  <div class="order-card fade">
    <h3>${o.date}</h3>
    <ul>${items}</ul>
    <p>Total ₹${o.total}</p>
  </div>`;
 });
}