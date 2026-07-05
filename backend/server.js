import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { products, categories } from "./data/products.js";
import { sendOrderConfirmation } from "./email.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory stores (swap for a real DB in production)
const carts = new Map(); // cartId -> [{ productId, qty, color }]
const orders = new Map(); // orderId -> order

function getCart(cartId) {
  if (!carts.has(cartId)) carts.set(cartId, []);
  return carts.get(cartId);
}

function hydrateCart(cartId) {
  const items = getCart(cartId);
  const hydrated = items.map((line) => {
    const product = products.find((p) => p.id === line.productId);
    return { ...line, product };
  });
  const subtotal = hydrated.reduce(
    (sum, l) => sum + (l.product?.price || 0) * l.qty,
    0
  );
  return { items: hydrated, subtotal, count: hydrated.reduce((n, l) => n + l.qty, 0) };
}

// ---------- Products ----------
app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.get("/api/products", (req, res) => {
  const { category, search, sort, minPrice, maxPrice } = req.query;
  let result = [...products];

  if (category && category !== "all") {
    result = result.filter((p) => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }
  if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));

  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
  if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

  res.json(result);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// ---------- Cart ----------
app.get("/api/cart/:cartId", (req, res) => {
  res.json(hydrateCart(req.params.cartId));
});

app.post("/api/cart/:cartId/items", (req, res) => {
  const { productId, qty = 1, color } = req.body;
  const product = products.find((p) => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const cart = getCart(req.params.cartId);
  const existing = cart.find((l) => l.productId === productId && l.color === color);
  if (existing) existing.qty += qty;
  else cart.push({ productId, qty, color: color || product.colors[0] });

  res.json(hydrateCart(req.params.cartId));
});

app.put("/api/cart/:cartId/items/:productId", (req, res) => {
  const { qty } = req.body;
  const cart = getCart(req.params.cartId);
  const line = cart.find((l) => l.productId === req.params.productId);
  if (!line) return res.status(404).json({ error: "Item not in cart" });
  line.qty = Math.max(1, qty);
  res.json(hydrateCart(req.params.cartId));
});

app.delete("/api/cart/:cartId/items/:productId", (req, res) => {
  const cart = getCart(req.params.cartId);
  const filtered = cart.filter((l) => l.productId !== req.params.productId);
  carts.set(req.params.cartId, filtered);
  res.json(hydrateCart(req.params.cartId));
});

// ---------- Checkout ----------
app.post("/api/orders", async (req, res) => {
  const { cartId, customer } = req.body;
  const { items, subtotal } = hydrateCart(cartId);
  if (!items.length) return res.status(400).json({ error: "Cart is empty" });

  const orderId = nanoid(8).toUpperCase();
  const order = {
    id: orderId,
    items,
    subtotal,
    shipping: subtotal > 500 ? 0 : 49,
    total: subtotal + (subtotal > 500 ? 0 : 49),
    customer,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  orders.set(orderId, order);
  carts.set(cartId, []); // clear cart after checkout

  const emailResult = await sendOrderConfirmation(order);
  order.emailPreviewUrl = emailResult.previewUrl;

  res.status(201).json(order);
});

app.get("/api/orders", (req, res) => {
  const all = Array.from(orders.values()).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json(all);
});

app.get("/api/orders/:orderId", (req, res) => {
  const order = orders.get(req.params.orderId);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`🛋️  Nestly API running at http://localhost:${PORT}`);
});
