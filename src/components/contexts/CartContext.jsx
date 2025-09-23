'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [specialRequestMessage, setSpecialRequestMessage] = useState("");

  const giftWrapItem = {
    id: "gift_wrap",
    variantId: "gift_wrap", // ✅ VariantId assign করা হলো
    title: "🎁 Gift Wrapping",
    price: 5,
    currency: "QAR",
    image: "https://cdn.shopify.com/s/files/1/0766/6365/2609/files/istockphoto-499158212-170x170.jpg",
    quantity: 1,
  };

  const formatProduct = (product, selectedVariant) => ({
    id: product.id,
    variantId: selectedVariant?.id || "", // Variant ID
    title: product.title,
    price: parseFloat(
      selectedVariant?.price?.amount || product?.priceRange?.minVariantPrice?.amount || 0
    ),
    currency: selectedVariant?.price?.currencyCode || product?.priceRange?.minVariantPrice?.currencyCode || "QAR",
    image: selectedVariant?.image?.url || product?.images?.edges?.[0]?.node?.url || "/placeholder.jpg",
    quantity: 1,
  });

  // LocalStorage থেকে cart load করা
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) setCartItems(JSON.parse(storedCart));

      const storedMessage = localStorage.getItem('specialRequestMessage');
      if (storedMessage) setSpecialRequestMessage(storedMessage);
    } catch (err) {
      console.error('Error loading cart from localStorage:', err);
    }
  }, []);

  // LocalStorage এ cart save করা
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      localStorage.setItem('specialRequestMessage', specialRequestMessage);
    } catch (err) {
      console.error('Error saving cart to localStorage:', err);
    }
  }, [cartItems, specialRequestMessage]);

  // Cart এ item add করা
  const addToCart = (product, selectedVariant) => {
    setCartItems((prev) => {
      const exists = prev.find(
        (item) => item.variantId === selectedVariant?.id
      );

      if (exists) {
        return prev.map((item) =>
          item.variantId === selectedVariant?.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, formatProduct(product, selectedVariant)];
    });
  };

  // Cart এ quantity update করা
  const updateQuantity = (variantId, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.variantId === variantId
          ? { ...item, quantity: type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  // Cart থেকে item remove করা
  const removeItem = (variantId) => {
    setCartItems((prev) => prev.filter((item) => !(item.variantId === variantId)));
  };

  // Gift wrap add/remove
  const addGiftWrap = () => {
    setCartItems((prev) =>
      prev.some((item) => item.id === "gift_wrap") ? prev : [...prev, giftWrapItem]
    );
  };

  const removeGiftWrap = () => {
    setCartItems((prev) => prev.filter((item) => item.id !== "gift_wrap"));
  };

  // Total calculation
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
        specialRequestMessage,
        setSpecialRequestMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
