"use client";

import { useCart } from "../contexts/CartContext";
import { useUI } from "../contexts/UIContext";
import CartSidebar from "./CartSidebar";

export default function CartClient({ product }) {
  const { isCartOpen, setIsCartOpen } = useUI();
  const { addToCart } = useCart(); // cartItems আর দরকার নেই এখানে

  const handleAddToCart = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <>
      <div>
        <button
          className="w-full bg-primary hover:bg-primary text-white text-base font-medium px-6 py-3 rounded-lg shadow-md transition-all"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>

      {/* ✅ Remove redundant cartItems prop */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}
