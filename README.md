# Steep & Leaf — Product Catalog & Cart

A plain HTML/CSS/JS product catalog for a loose-leaf tea shop, with category
filtering and a slide-out cart ("order ticket") that tracks quantities and
totals.

## Files

- `index.html` — page structure
- `style.css` — all styling (colors/fonts as CSS variables at the top)
- `script.js` — loads products, handles filtering, cart add/remove/quantity, totals
- `products.json` — the product data (edit this to add/remove/change products)

## Running it

Browsers block `fetch()` of local JSON files when a page is opened directly
(`file://...`), so serve the folder instead of double-clicking `index.html`:

**Python (built-in on most systems):**
```
cd tea-shop-cart
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

**Node (if you have it):**
```
npx serve .
```

**VS Code:** install the "Live Server" extension and click "Go Live".

## Customizing

- **Add a product:** add an object to `products.json` with `id`, `name`,
  `category`, `price`, `tin` (a hex color for the swatch), `note`, and
  `description`. Categories and filter chips are generated automatically
  from whatever categories appear in the data.
- **Cart persistence:** the cart is saved to `localStorage`, so it survives
  a page refresh. Clear it by emptying the cart or clearing site data.
- **Colors/fonts:** all design tokens live at the top of `style.css` under
  `:root`.
