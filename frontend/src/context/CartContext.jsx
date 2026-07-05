import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../api";

const CartContext = createContext(null);

function getCartId() {
  let id = localStorage.getItem("nestly-cart-id");
  if (!id) {
    id = `cart_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    localStorage.setItem("nestly-cart-id", id);
  }
  return id;
}

export function CartProvider({ children }) {
  const [cartId] = useState(getCartId);
  const [cart, setCart] = useState({ items: [], subtotal: 0, count: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const data = await api.getCart(cartId);
      setCart(data);
    } catch (e) {
      console.error(e);
    }
  }, [cartId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = async (productId, color, qty = 1) => {
    setLoading(true);
    try {
      const data = await api.addToCart(cartId, { productId, color, qty });
      setCart(data);
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const updateQty = async (productId, qty) => {
    const data = await api.updateCartItem(cartId, productId, qty);
    setCart(data);
  };

  const removeItem = async (productId) => {
    const data = await api.removeCartItem(cartId, productId);
    setCart(data);
  };

  return (
    <CartContext.Provider
      value={{ cartId, cart, addItem, updateQty, removeItem, refresh, isOpen, setIsOpen, loading }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
