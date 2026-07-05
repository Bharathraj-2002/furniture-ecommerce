# Nestly — Furniture E-Commerce (React + Node/Express)

A full-stack furniture store: a colorful, animated React frontend and a
REST API backend, wired together with real HTTP calls (no mock data in the
frontend — everything comes from the backend).

## Stack

- **Frontend:** React 18 + Vite, React Router, Tailwind CSS, Framer Motion
- **Backend:** Node.js + Express (in-memory data — swap in a real DB for production)
- 28 furniture products across 8 categories (sofas, chairs, tables, beds, storage, lighting, decor, outdoor)

## Features

- Animated hero with floating "swatch" elements, category grid, featured products
- Shop page with category filters, live search, sorting, skeleton loading states
- Product detail page with color selection, quantity, animated add-to-cart
- Sliding cart drawer (backend-backed cart, persisted per browser via a cart ID in localStorage)
- Checkout flow that posts a real order to the backend and shows a confirmation screen
- Page transitions, hover micro-interactions, and reduced-motion support throughout

## Getting started

You'll need [Node.js](https://nodejs.org) 18+ installed.

### 1. Start the backend

```bash
cd backend
npm install
npm run dev
```

The API runs at `http://localhost:4000`. Check `http://localhost:4000/api/health`.

### 2. Start the frontend (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`. Vite's dev server proxies any request
to `/api/*` straight to the backend on port 4000, so no CORS setup is needed
in development.

### 3. Build for production

```bash
cd frontend
npm run build   # outputs static files to frontend/dist
```

Deploy `frontend/dist` to any static host (Vercel, Netlify, etc.), and deploy
`backend/` to any Node host (Render, Railway, Fly.io, etc.) — then update the
frontend's API base URL (see `src/api.js`) or your host's rewrite rules to
point `/api` at the deployed backend.

## API reference

| Method | Route                              | Description                     |
|--------|-------------------------------------|----------------------------------|
| GET    | `/api/categories`                   | List categories                  |
| GET    | `/api/products`                     | List products (query: `category`, `search`, `sort`, `minPrice`, `maxPrice`) |
| GET    | `/api/products/:id`                 | Get one product                  |
| GET    | `/api/cart/:cartId`                 | Get a cart                       |
| POST   | `/api/cart/:cartId/items`           | Add an item `{ productId, qty, color }` |
| PUT    | `/api/cart/:cartId/items/:productId`| Update quantity `{ qty }`        |
| DELETE | `/api/cart/:cartId/items/:productId`| Remove an item                   |
| POST   | `/api/orders`                       | Checkout `{ cartId, customer }`  |
| GET    | `/api/orders`                       | List all orders, newest first    |
| GET    | `/api/orders/:orderId`              | Look up one order                |

## Viewing customer orders

Go to `http://localhost:5173/admin` while both servers are running to see every
order placed — customer name/email, items, total, and shipping address — in a
table that click-to-expands and auto-refreshes every 5 seconds. This is a demo
admin view with no login; add authentication before using anything like this
in production.

## Order confirmation emails

When a customer checks out, the backend "sends" a confirmation email. By
default it uses **Ethereal**, a free fake-SMTP testing service — it does not
deliver to a real inbox. Instead, both the checkout confirmation page and the
admin orders page show a **"View confirmation email"** link that opens a live
preview of exactly what would have been sent.

To send **real** emails to real inboxes, set these environment variables
before running `npm run dev` in `backend/` (create a `.env` file or set them
in your terminal), and the code will automatically use them instead of
Ethereal:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=youraddress@gmail.com
SMTP_PASS=your_16_character_app_password
```

For Gmail, `SMTP_PASS` must be an **App Password** (Google Account → Security
→ 2-Step Verification → App passwords) — your normal Gmail password will be
rejected. Any other SMTP provider (Outlook, SendGrid, etc.) works the same way
by pointing `SMTP_HOST`/`SMTP_PORT` at their servers.

## Notes

- Product images use `picsum.photos` placeholders — swap the `image` URLs in
  `backend/data/products.js` for real product photography whenever you're ready.
- Cart and order data live in memory on the server, so they reset if the
  backend restarts. Swap in Postgres/MongoDB/etc. for anything real.
- Color palette, fonts, and the floating-swatch hero were designed specifically
  for this brief — see the Tailwind config for the full token system.
