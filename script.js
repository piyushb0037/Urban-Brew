let cart = 0;

const products = [
  {id:1,name:"Espresso",price:299,category:"hot",img:"https://images.unsplash.com/photo-1511920170033-f8396924c348"},
  {id:2,name:"Latte",price:349,category:"hot",img:"https://images.unsplash.com/photo-1498804103079-a6351b050096"},
  {id:3,name:"Cold Brew",price:399,category:"cold",img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93"}
];

function displayProducts(list){
  const container = document.getElementById("products");
  container.innerHTML="";
  list.forEach(p=>{
    container.innerHTML+=`
    <div class="card reveal">
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart()">Add to Cart</button>
    </div>`;
  });
}

displayProducts(products);

function addToCart(){
  cart++;
  document.getElementById("cart-count").innerText = cart;
}

function filterProducts(category){
  if(category==="all") displayProducts(products);
  else displayProducts(products.filter(p=>p.category===category));
}

function toggleDarkMode(){
  document.body.classList.toggle("dark");
}

function openAuth(){
  document.getElementById("authModal").style.display="flex";
}

function closeAuth(){
  document.getElementById("authModal").style.display="none";
}

async function register(){
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;

  await fetch("http://localhost:5000/register",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,password})
  });

  alert("Registered!");
}

async function login(){
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;

  const res=await fetch("http://localhost:5000/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,password})
  });

  const data=await res.json();
  alert(data.message);
}

/* Scroll Animation */
window.addEventListener("scroll",()=>{
  document.querySelectorAll(".reveal").forEach(el=>{
    if(el.getBoundingClientRect().top<window.innerHeight-100){
      el.classList.add("active");
    }
  });
});







// PAGE NAVIGATION
function goHome(){ window.location.href="index.html"; }
function goShop(){ window.location.href="shop.html"; }
function goAbout(){ window.location.href="about.html"; }
function goContact(){ window.location.href="contact.html"; }

// CART (Persistent using localStorage)
let cart = localStorage.getItem("cart") || 0;
document.addEventListener("DOMContentLoaded",()=>{
  const cartCount = document.getElementById("cart-count");
  if(cartCount) cartCount.innerText = cart;
});

function addToCart(){
  cart++;
  localStorage.setItem("cart",cart);
  document.getElementById("cart-count").innerText = cart;
}

// PRODUCTS
const products = [
 {id:1,name:"Espresso",price:299,category:"hot"},
 {id:2,name:"Latte",price:349,category:"hot"},
 {id:3,name:"Cold Brew",price:399,category:"cold"}
];

function displayProducts(list){
  const container = document.getElementById("products");
  if(!container) return;

  container.innerHTML="";
  list.forEach(p=>{
    container.innerHTML+=`
    <div class="card">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart()">Add to Cart</button>
    </div>`;
  });
}

if(document.getElementById("products")){
  displayProducts(products);
}

function filterProducts(category){
  if(category==="all") displayProducts(products);
  else displayProducts(products.filter(p=>p.category===category));
}

// CONTACT FORM
async function sendMessage(){
  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value;
  const message=document.getElementById("message").value;

  await fetch("http://localhost:5000/contact",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name,email,message})
  });

  alert("Message Sent!");
}








// NEW: Store cart as an array of items
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Update the bubble count on every page
function updateCartUI() {
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartDisplay = document.getElementById("cart-count");
    if(cartDisplay) cartDisplay.innerText = count;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Update the Shop "Add to Cart" function
function addToCart(id, name, price, img) {
    const existingItem = cartItems.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ id, name, price, img, quantity: 1 });
    }
    updateCartUI();
    alert(name + " added to cart! ☕");
}

// FUNCTION TO DISCARD/REMOVE
function removeFromCart(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    updateCartUI();
    displayFullCart(); // Refresh the list on the cart page
}

// Function to decrease quantity
function changeQuantity(id, delta) {
    const item = cartItems.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(id);
        }
    }
    updateCartUI();
    displayFullCart();
}

// Display items on the cart.html page
function displayFullCart() {
    const listContainer = document.getElementById("cart-items-list");
    const totalContainer = document.getElementById("cart-total-price");
    if (!listContainer) return;

    listContainer.innerHTML = "";
    let total = 0;

    if (cartItems.length === 0) {
        listContainer.innerHTML = "<h3>Your cart is empty. Go buy some coffee!</h3>";
    }

    cartItems.forEach(item => {
        total += item.price * item.quantity;
        listContainer.innerHTML += `
            <div class="cart-item">
                <div style="display:flex; align-items:center; gap:20px;">
                    <img src="${item.img}">
                    <div>
                        <h3>${item.name}</h3>
                        <p>₹${item.price}</p>
                    </div>
                </div>
                <div class="cart-controls">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span style="margin: 0 10px;">${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Discard</button>
                </div>
            </div>
        `;
    });
    totalContainer.innerText = "Total: ₹" + total;
}

// Navigation for the cart
document.querySelector(".cart")?.addEventListener("click", () => {
    window.location.href = "cart.html";
});

// Run UI update on page load
updateCartUI();





// Load cart items from local storage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Function to display items on the cart.html page
function displayFullCart() {
    const listContainer = document.getElementById("cart-items-list");
    const totalContainer = document.getElementById("cart-total-price");
    
    if (!listContainer) return;

    listContainer.innerHTML = "";
    let total = 0;

    if (cartItems.length === 0) {
        listContainer.innerHTML = "<h3>Your cart is empty. ☕</h3>";
        totalContainer.innerText = "Total: ₹0";
        return;
    }

    cartItems.forEach((item, index) => {
        total += item.price * item.quantity;
        listContainer.innerHTML += `
            <div class="cart-item">
                <div style="display:flex; align-items:center; gap:20px;">
                    <img src="${item.img}" alt="${item.name}">
                    <div>
                        <h3>${item.name}</h3>
                        <p>₹${item.price}</p>
                    </div>
                </div>
                <div class="cart-controls">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <span style="margin: 0 10px;">${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    <button class="remove-btn" onclick="removeItem(${index})">Discard</button>
                </div>
            </div>
        `;
    });
    totalContainer.innerText = "Total: ₹" + total;
}

// Adjust quantity
function changeQuantity(index, delta) {
    cartItems[index].quantity += delta;
    if (cartItems[index].quantity < 1) {
        removeItem(index);
    } else {
        saveCart();
    }
}

// Remove item entirely
function removeItem(index) {
    cartItems.splice(index, 1);
    saveCart();
}

function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    displayFullCart();
    updateCartCount(); // Updates the 🛒 bubble
}

function updateCartCount() {
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartBubble = document.getElementById("cart-count");
    if (cartBubble) cartBubble.innerText = count;
}

// Link the Checkout button
document.querySelector(".submit-btn")?.addEventListener("click", () => {
    if (cartItems.length > 0) {
        window.location.href = "checkout.html";
    } else {
        alert("Your cart is empty!");
    }
});

// Navigation helpers
function goHome() { window.location.href = "index.html"; }
function goShop() { window.location.href = "shop.html"; }