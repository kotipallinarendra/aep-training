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

   // --- Initialize or Create Cart ID ---
  const [cartId, setCartId] = useState(() => {
    try {
      const storedId = localStorage.getItem('cartId');
      if (storedId) return storedId;

      // Generate new 15-char unique ID
      const newId = Math.random().toString(36).substring(2, 17).toUpperCase();
      localStorage.setItem('cartId', newId);
      return newId;
    } catch (error) {
      console.error("Failed to initialize cart ID:", error);
      return null;
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
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      let newCart;
      if (existing) {
        newCart = prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      } else {
        newCart = [...prev, { ...product, quantity: quantity}];
      }

      // Push dataLayer event
      pushDataLayer({
        event: 'addToCart',
        cartId,
        product: {...product, quantity: quantity},
        cart: newCart.map(item => ({
          SKU: item.id,
          name: item.title,
          productImageUrl: item.image,
          productCategories: [
            {
              'categoryID': item.category,
              'categoryName': item.category,
              'categoryPath': `/category/${item.category}`
            },
            {
              'categoryID': item.subcategory,
              'categoryName': item.subcategory,
              'categoryPath': `/category/${item.category}`
            }
          ],
          priceTotal: item.price,
          currencyCode: 'INR',
          quantity: item.quantity
        }))
      });

      triggerToast('Added to cart successfully!', true, 'green');
      return newCart;
    });
  };

  // Remove product from cart
  const removeFromCart = (product) => {
    setCart((prev) => {
      const newCart = prev.filter((p) => p.id !== product.id);
      pushDataLayer({ 
        event: 'removeFromCart',
        cartId,
        product: product,
        cart: newCart.map(item => ({
          SKU: item.id,
          name: item.title,
          productImageUrl: item.image,
          productCategories: [
            {
              'categoryID': item.category,
              'categoryName': item.category,
              'categoryPath': `/category/${item.category}`
            },
            {
              'categoryID': item.subcategory,
              'categoryName': item.subcategory,
              'categoryPath': `/category/${item.category}`
            }
          ],
          priceTotal: item.price,
          currencyCode: 'INR',
          quantity: item.quantity
        }))
      });

      triggerToast('Removed from cart successfully!', true, 'red');
      return newCart;
    });
  };

  // Update quantity
  const updateQuantity = (product, qty) => {
    if (qty <= 0) {
      removeFromCart(product);
    } else {
      setCart((prev) => {
        const newCart = prev.map((p) =>
          p.id === product.id ? { ...p, quantity: qty } : p
        );
        pushDataLayer({ 
          event: 'cartUpdate', 
          cartId,
          product: product,
          cart: newCart.map(item => ({
            SKU: item.id,
            name: item.title,
            productImageUrl: item.image,
            productCategories: [
              {
                'categoryID': item.category,
                'categoryName': item.category,
                'categoryPath': `/category/${item.category}`
              },
              {
                'categoryID': item.subcategory,
                'categoryName': item.subcategory,
                'categoryPath': `/category/${item.category}`
              }
            ],
            priceTotal: item.price,
            currencyCode: 'INR',
            quantity: item.quantity
          }))
        });

        triggerToast('Updated the Product Quantity to cart successfully!', true, 'green');
        return newCart;
      });
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('cartId');

    pushDataLayer({ event: 'cartCleared', cartId });

    // Generate new ID for next session
    const newId = Math.random().toString(36).substring(2, 17).toUpperCase();
    setCartId(newId);
    localStorage.setItem('cartId', newId);
  };

  return (
    <CartContext.Provider value={{ cart, cartId, setCart, addToCart, removeFromCart, updateQuantity, clearCart, toast }}>
      {children}
    </CartContext.Provider>
  );
};