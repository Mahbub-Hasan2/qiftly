'use client'

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const giftWrapItem = {
    id: "gift_wrap",
    title: "🎁 Gift Wrapping",
    price: 5,
    currency: "QAR",
    image: "https://cdn.shopify.com/s/files/1/0766/6365/2609/files/istockphoto-499158212-170x170.jpg",
    quantity: 1,
  };

  const formatProduct = (product) => ({
    id: product.id,
    title: product.title,
    price: parseFloat(product?.priceRange?.minVariantPrice?.amount || 0),
    currency: product?.priceRange?.minVariantPrice?.currencyCode || "QAR",
    image: product?.images?.edges?.[0]?.node?.url || "/placeholder.jpg",
    quantity: 1,
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading cart:', err);
    }
  }, []);

  // Save to localStorage on cart change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, formatProduct(product)];
    });
  };

  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const addGiftWrap = () => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === "gift_wrap");
      if (exists) return prev;
      return [...prev, giftWrapItem];
    });
  };

  const removeGiftWrap = () => {
    setCartItems((prev) => prev.filter((item) => item.id !== "gift_wrap"));
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        totalItems,
        totalPrice,
        addGiftWrap,
        removeGiftWrap,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
