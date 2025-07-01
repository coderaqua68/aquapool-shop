import { useState, useEffect } from "react";
import { cartStore } from "../lib/cart-store";

export function useCart() {
  const [items, setItems] = useState(cartStore.items);
  const [isOpen, setIsOpen] = useState(cartStore.isOpen);

  useEffect(() => {
    const unsubscribe = cartStore.subscribe(() => {
      setItems([...cartStore.items]);
      setIsOpen(cartStore.isOpen);
    });
    return unsubscribe;
  }, []);

  return {
    items,
    isOpen,
    addItem: cartStore.addItem.bind(cartStore),
    removeItem: cartStore.removeItem.bind(cartStore),
    updateQuantity: cartStore.updateQuantity.bind(cartStore),
    clearCart: cartStore.clearCart.bind(cartStore),
    getTotal: cartStore.getTotal.bind(cartStore),
    getItemCount: cartStore.getItemCount.bind(cartStore),
    setIsOpen: cartStore.setIsOpen.bind(cartStore),
  };
}
