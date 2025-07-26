// components/products/CartClient.jsx
'use client';

import { useCart } from '../contexts/CartContext';
import { useUI } from '../contexts/UIContext';
import CartSidebar from './CartSidebar';

export default function CartClient({ product }) {
    const { isCartOpen, setIsCartOpen } = useUI();
    const { addToCart } = useCart();

    return (
        <>
            {/* Add to Cart Button */}
            <div>
                <button
                    className="w-full bg-primary hover:bg-primary text-white text-base font-medium px-6 py-3 rounded-lg shadow-md transition-all"
                    onClick={() =>( setIsCartOpen(true), addToCart(product))}
                >
                    Add to Cart
                </button>
            </div>

            {/* Cart Sidebar */}
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={[product]} // একটা array দিতে হবে
            />
        </>
    );
}
