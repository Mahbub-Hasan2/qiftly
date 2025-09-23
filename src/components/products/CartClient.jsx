"use client";

import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useUI } from "../contexts/UIContext";
import CartSidebar from "./CartSidebar";

export default function CartClient({ product }) {
  const { addToCart } = useCart();
  const { isCartOpen, setIsCartOpen } = useUI();

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showVariantError, setShowVariantError] = useState(false);

  const variants = product?.variants?.edges || [];
  const hasVariants = variants.length > 0;

  // 👉 যদি একটাই variant থাকে, auto select করে দিচ্ছি
  useEffect(() => {
    if (variants.length === 1) {
      setSelectedVariant(variants[0].node);
    }
  }, [variants]);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setShowVariantError(false);
  };

  const handleAddToCart = () => {
    if (hasVariants) {
      if (variants.length > 1 && !selectedVariant) {
        // একাধিক variant থাকলে অবশ্যই select করতে হবে
        setShowVariantError(true);
        alert("দয়া করে আগে ভেরিয়েন্ট সিলেক্ট করুন!");
        return;
      }
      // একটাই variant থাকলে auto-selected হবে, তাই validation লাগবে না
      addToCart(product, selectedVariant || variants[0].node);
    } else {
      // কোনো variant না থাকলে direct product add হবে
      addToCart(product, {
        id: product.id,
        title: product.title,
      });
    }

    setIsCartOpen(true);
  };

  return (
    <>
      {variants.length > 1 && (
        <div className="flex gap-3 flex-wrap mt-4">
          {variants.map(({ node }) => (
            <button
              key={`${product.id}-${node.id}`} // ✅ unique key
              className={`border rounded-lg p-2 cursor-pointer transition-all ${
                node.id === selectedVariant?.id
                  ? "border-[#787F3F] ring-2 ring-[#787F3F]"
                  : showVariantError
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onClick={() => handleVariantSelect(node)}
            >
              {node.selectedOptions.map((opt) => (
                <span key={opt.name} className="text-sm">{opt.value}</span>
              ))}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4">
        <button
          className="cursor-pointer w-full bg-primary hover:bg-primary text-white text-base font-medium px-6 py-3 rounded-lg shadow-md transition-all"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
