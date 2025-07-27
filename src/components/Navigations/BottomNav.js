"use client";
import { Home, Grid, User, ShoppingBag, Search } from 'lucide-react';
import Link from 'next/link';
import { useUI } from '../contexts/UIContext';
import { useCart } from '../contexts/CartContext';

const BottomNav = () => {
  const { isMobileSearch, setIsMobileSearch, isFocused, setIsFocused, setIsCartOpen } = useUI();
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-md border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-between items-center px-6 py-2">
        <NavItem href="/" icon={<Home size={22} />} label="Home" />
        <NavItem href="/collections" icon={<Grid size={22} />} label="Collections" />
        <SearchItem
          onClick={() => {
            setIsMobileSearch(!isMobileSearch);
            setIsFocused(!isFocused);
          }}
          icon={<Search size={22} />}
          label="Search"
        />
        <NavItem href="/account/user" icon={<User size={22} />} label="Account" />

        {/* ✅ Cart with Quantity Badge - Link Disabled */}
        <CartItem
          onClick={() => setIsCartOpen(true)}
          icon={
            <div className="relative">
              <ShoppingBag size={22} />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>
          }
          label="Cart"
        />
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon, label }) => (
  <Link href={href} className="flex flex-col items-center text-xs text-primary hover:text-gray-600">
    {icon}
    <span className="mt-1">{label}</span>
  </Link>
);

const SearchItem = ({ onClick, icon, label }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center text-xs text-primary hover:text-gray-600 focus:outline-none"
  >
    {icon}
    <span className="mt-1">{label}</span>
  </button>
);

// ❌ Cart Link Disabled
const CartItem = ({ onClick, icon, label }) => (
  <div onClick={onClick} className="flex flex-col items-center text-xs text-primary hover:text-gray-600 focus:outline-none">
    {icon}
    <span className="mt-1">{label}</span>
  </div>
);

export default BottomNav;
