// ---------- State ----------
let products = [];
let cart = {};              // { productId: quantity }
let activeCategory = "All";

const CART_STORAGE_KEY = "steepandleaf.cart";

// ---------- DOM refs ----------
const filterBar     = document.getElementById("filterBar");
const productGrid   = document.getElementById("productGrid");
const cartItemsEl   = document.getElementById("cartItems");
const cartEmptyEl    = document.getElementById("cartEmpty");
const cartSubtotalEl = document.getElementById("cartSubtotal");
const cartTotalEl   = document.getElementById("cartTotal");
const cartCountEl   = document.getElementById("cartCount");
const cartDrawer    = document.getElementById("cartDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");
const cartToggle    = document.getElementById("cartToggle");
const cartClose     = document.getElementById("cartClose");
const checkoutBtn   = document.getElementById("checkoutBtn");
const ticketNumber  = document.getElementById("ticketNumber");

// ---------- Init ----------
init();

async function init() {
  loadCartFromStorage();
  await loadProducts();
  renderFilters();
  renderProducts();
  renderCart();
  bindGlobalEvents();
}

async function loadProducts() {
  try {
    const res = await fetch("products.json");
    if (!res.ok) throw new Error("Failed to load products.json");
    products = await res.json();
  } catch (err) {
    // Fallback message if the page is opened directly via file:// where
    // fetch() of local JSON is blocked by the browser's CORS policy.
    productGrid.innerHTML = `
      <div class="empty-state">
        <p><strong>Couldn't load products.json.</strong></p>
        <p>If you opened this file directly (file://), start a local server instead, e.g.:</p>
        <p class="mono">python3 -m http.server 8000</p>
        <p>then visit <span class="mono">http://localhost:8000</span></p>
      </div>`;
    console.error(err);
  }
}

// ---------- Rendering: filters ----------
function renderFilters() {
  const categories = ["All", ...new Set(products.map(p => p.category))];
  filterBar.innerHTML = categories.map(cat => `
    <button class="chip ${cat === activeCategory ? "active" : ""}" data-category="${cat}">
      ${cat}
    </button>
  `).join("");

  filterBar.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      activeCategory = chip.dataset.category;
      renderFilters();
      renderProducts();
    });
  });
}

// ---------- Rendering: product grid ----------
function renderProducts() {
  const list = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory);

  if (list.length === 0) {
    productGrid.innerHTML = `<div class="empty-state"><p>No products in this category yet.</p></div>`;
    return;
  }

  productGrid.innerHTML = list.map(p => `
    <article class="product-card">
      <div class="tin-swatch" style="background:${p.tin}">
        <span class="tin-category">${p.category}</span>
      </div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <p class="product-note">${p.note}</p>
        <div class="product-foot">
          <span class="product-price mono">$${p.price.toFixed(2)}</span>
          <button class="add-btn" data-id="${p.id}">Add to Ticket</button>
        </div>
      </div>
    </article>
  `).join("");

  productGrid.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.id);
      btn.textContent = "Added";
      btn.classList.add("just-added");
      setTimeout(() => {
        btn.textContent = "Add to Ticket";
        btn.classList.remove("just-added");
      }, 900);
    });
  });
}

// ---------- Cart logic ----------
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCartToStorage();
  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  saveCartToStorage();
  renderCart();
}

function changeQty(id, delta) {
  const next = (cart[id] || 0) + delta;
  if (next <= 0) {
    delete cart[id];
  } else {
    cart[id] = next;
  }
  saveCartToStorage();
  renderCart();
}

function getCartEntries() {
  return Object.entries(cart)
    .map(([id, qty]) => ({ product: products.find(p => p.id === id), qty }))
    .filter(entry => entry.product); // guard against stale ids
}

function renderCart() {
  const entries = getCartEntries();
  const totalItems = entries.reduce((sum, e) => sum + e.qty, 0);
  const subtotal = entries.reduce((sum, e) => sum + e.qty * e.product.price, 0);

  cartCountEl.textContent = totalItems;
  cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  cartTotalEl.textContent = `$${subtotal.toFixed(2)}`;
  checkoutBtn.disabled = entries.length === 0;
  ticketNumber.textContent = String(totalItems).padStart(4, "0");

  if (entries.length === 0) {
    cartItemsEl.innerHTML = "";
    cartEmptyEl.style.display = "block";
    return;
  }
  cartEmptyEl.style.display = "none";

  cartItemsEl.innerHTML = entries.map(({ product, qty }) => `
    <div class="cart-item" data-id="${product.id}">
      <span class="cart-item-tin" style="background:${product.tin}"></span>
      <div>
        <p class="cart-item-name">${product.name}</p>
        <p class="cart-item-unit">$${product.price.toFixed(2)} / ea</p>
        <div class="cart-item-controls">
          <button class="qty-btn" data-action="dec" aria-label="Decrease quantity">–</button>
          <span class="qty-value">${qty}</span>
          <button class="qty-btn" data-action="inc" aria-label="Increase quantity">+</button>
          <button class="remove-btn" data-action="remove">Remove</button>
        </div>
      </div>
      <span class="cart-item-line-total">$${(qty * product.price).toFixed(2)}</span>
    </div>
  `).join("");

  cartItemsEl.querySelectorAll(".cart-item").forEach(row => {
    const id = row.dataset.id;
    row.querySelector('[data-action="inc"]').addEventListener("click", () => changeQty(id, 1));
    row.querySelector('[data-action="dec"]').addEventListener("click", () => changeQty(id, -1));
    row.querySelector('[data-action="remove"]').addEventListener("click", () => removeFromCart(id));
  });
}

// ---------- Persistence ----------
function saveCartToStorage() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    console.warn("Could not save cart to localStorage:", err);
  }
}

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    cart = raw ? JSON.parse(raw) : {};
  } catch (err) {
    cart = {};
  }
}

// ---------- Drawer open/close ----------
function openDrawer() {
  cartDrawer.classList.add("open");
  drawerOverlay.classList.add("visible");
}
function closeDrawer() {
  cartDrawer.classList.remove("open");
  drawerOverlay.classList.remove("visible");
}

function bindGlobalEvents() {
  cartToggle.addEventListener("click", openDrawer);
  cartClose.addEventListener("click", closeDrawer);
  drawerOverlay.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });
  checkoutBtn.addEventListener("click", () => {
    alert("This is a demo — no payment is taken. Thanks for steeping with us!");
    cart = {};
    saveCartToStorage();
    renderCart();
    closeDrawer();
  });
}
