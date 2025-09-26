import React, { createContext, useState, useEffect } from 'react';
import { pushDataLayer } from '../utils/datalayer';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Initialize state from localStorage safely
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      return [];
    }
  });

  // Toast state
  const [toast, setToast] = useState({ message: '', show: false, color:'green'});

  const triggerToast = (message, visibility, color) => {
    setToast({ message, show: visibility, color: color});
    setTimeout(() => setToast({ message: '', show: false, color: color}), 500);
  };

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      let newCart;
      if (existing) {
        newCart = prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        newCart = [...prev, { ...product, quantity: 1 }];
      }

      // Push dataLayer event
      pushDataLayer({
        event: 'addToCart',
        cart: newCart,
        product: product
      });

      triggerToast('Added to cart successfully!', true, 'green');
      return newCart;
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prev) => {
      const newCart = prev.filter((p) => p.id !== productId);
      pushDataLayer({ event: 'removeFromCart', cart: newCart, product: productId });

      triggerToast('Removed from cart successfully!', true, 'red');
      return newCart;
    });
  };

  // Update quantity
  const updateQuantity = (productId, qty) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prev) => {
        const newCart = prev.map((p) =>
          p.id === productId ? { ...p, quantity: qty } : p
        );
        pushDataLayer({ event: 'cartUpdate', cart: newCart});

        triggerToast('Updated the Product Quantity to cart successfully!', true, 'green');
        return newCart;
      });
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, clearCart, toast }}>
      {children}
    </CartContext.Provider>
  );
};