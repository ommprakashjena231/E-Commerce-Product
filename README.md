# 🛒 E-Commerce Product Catalog with Shopping Cart

A responsive **E-Commerce Product Catalog** built using **HTML, CSS, and JavaScript**. This project demonstrates core front-end e-commerce functionality, including dynamic product loading from a local JSON file, category-based filtering, and an interactive shopping cart with real-time price calculations.

---

## 🚀 Features

* 📦 Display products dynamically from a local JSON file
* 🛍️ Add products to the shopping cart
* ❌ Remove items from the cart
* 🔢 Update product quantities
* 💰 Automatic total price calculation
* 🏷️ Filter products by category
* 💾 Cart persistence using Local Storage
* 📱 Fully responsive design for desktop, tablet, and mobile devices
* ⚡ Lightweight and built with Vanilla JavaScript

---

## 📂 Project Structure

```text
ecommerce-product-catalog/
│
├── index.html          # Main application layout
├── style.css           # Styling and responsive design
├── script.js           # Product rendering, filtering, and cart logic
├── products.json       # Product data
└── README.md           # Project documentation
```





## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6+)
* Fetch API
* Local Storage API

---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/your-username/ecommerce-product-catalog.git
```

Navigate to the project directory:

```bash
cd ecommerce-product-catalog
```

Since the project loads product data using the **Fetch API**, serve it through a local web server.

### Option 1: Python

```bash
python3 -m http.server 8000
```

Open:

```
http://localhost:8000
```

### Option 2: Node.js

```bash
npx serve .
```

### Option 3: VS Code

Install the **Live Server** extension and click **Go Live**.

---

## 🛍️ Product Features

### Product Listing

* Displays products dynamically from `products.json`
* Shows product image, name, price, category, and description
* Responsive product grid layout

### Category Filtering

* Filter products by category
* Categories are generated automatically from the JSON data
* Instantly updates the product list

### Shopping Cart

* Add products to the cart
* Remove products from the cart
* Increase or decrease product quantity
* Automatically update the total price
* Display cart subtotal and item count
* Save cart data using Local Storage

---

## 📄 Product JSON Format

Example product object:

```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "category": "Electronics",
  "price": 59.99,
  "image": "images/headphones.jpg",
  "description": "High-quality wireless headphones with noise cancellation."
}
```

### Required Fields

| Field         | Description         |
| ------------- | ------------------- |
| `id`          | Unique product ID   |
| `name`        | Product name        |
| `category`    | Product category    |
| `price`       | Product price       |
| `image`       | Product image path  |
| `description` | Product description |

---

## 🎨 Customization

### Add New Products

Simply add a new object to `products.json`.

The application will automatically:

* Display the new product
* Generate category filters
* Enable add-to-cart functionality

### Update Styling

Modify design variables in `style.css` to customize:

* Colors
* Typography
* Buttons
* Cards
* Layout
* Responsive breakpoints

---

## 📱 Responsive Design

Optimized for:

* 💻 Desktop
* 📱 Mobile
* 📲 Tablet

---

## 🔮 Future Enhancements

* 🔍 Product search
* ↕️ Sort by price, popularity, or rating
* ❤️ Wishlist functionality
* ⭐ Product ratings and reviews
* 👤 User authentication
* 💳 Checkout page
* 🌙 Dark mode
* 🔔 Toast notifications
* 📦 Backend integration with database
* 💸 Discount coupon support

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author
Omm prakash Jena
---

⭐ If you found this project helpful, consider giving it a **Star** on GitHub!
