"use client";
import { Home, Grid, User, ShoppingBag, Search } from 'lucide-react';
import Link from 'next/link';
import { useUI } from '../contexts/UIContext';

const BottomNav = () => {
  const {isMobileSearch, setIsMobileSearch, isFocused, setIsFocused } = useUI();

  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-md border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-between items-center px-6 py-2">
        <NavItem href="/" icon={<Home size={22} />} label="Home" />
        <NavItem href="/collections" icon={<Grid size={22} />} label="Collections" />
        <SearchItem onClick={() => (setIsMobileSearch(!isMobileSearch), setIsFocused(!isFocused))} icon={<Search size={22} />} label="Search" />
        <NavItem href="/account/user" icon={<User size={22} />} label="Account" />
        <NavItem href="/cart" icon={<ShoppingBag size={22} />} label="Cart" />
      </div>
    </nav>
  );
};

// Normal nav item with link
const NavItem = ({ href, icon, label }) => (
  <Link href={href} className="flex flex-col items-center text-xs text-primary hover:text-gray-600">
    {icon}
    <span className="mt-1">{label}</span>
  </Link>
);

// Special search item without link
const SearchItem = ({ onClick, icon, label }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center text-xs text-primary hover:text-gray-600 focus:outline-none"
  >
    {icon}
    <span className="mt-1">{label}</span>
  </button>
);

export default BottomNav;
