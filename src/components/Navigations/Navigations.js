'use client';

import { useUI } from "../contexts/UIContext";
import CartSidebar from "../products/CartSidebar";
import BottomNav from "./BottomNav";
import Navbar from "./Navbar";

export default function Navigations({ menuItems }) {

    const { isCartOpen, setIsCartOpen } = useUI();
    return (
        <div>
            <Navbar menuItems={menuItems} />

            <BottomNav />

            {/* ✅ Remove redundant cartItems prop */}
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </div>
    )
}