const BASE = "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

export const api = {
  getCategories: () => request("/categories"),
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== "" && v != null))
    ).toString();
    return request(`/products${qs ? `?${qs}` : ""}`);
  },
  getProduct: (id) => request(`/products/${id}`),
  getCart: (cartId) => request(`/cart/${cartId}`),
  addToCart: (cartId, body) =>
    request(`/cart/${cartId}/items`, { method: "POST", body: JSON.stringify(body) }),
  updateCartItem: (cartId, productId, qty) =>
    request(`/cart/${cartId}/items/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ qty }),
    }),
  removeCartItem: (cartId, productId) =>
    request(`/cart/${cartId}/items/${productId}`, { method: "DELETE" }),
  checkout: (cartId, customer) =>
    request("/orders", { method: "POST", body: JSON.stringify({ cartId, customer }) }),
  getAllOrders: () => request("/orders"),
};
