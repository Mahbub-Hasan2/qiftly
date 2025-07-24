// components/BottomNav.js
import { Home, Truck, Grid, User, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-md border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-between items-center px-6 py-2">
        <NavItem href="/" icon={<Home size={22} />} label="Home" />
        <NavItem href="/same-day" icon={<Truck size={22} />} label="Same Day" />
        <NavItem href="/collections" icon={<Grid size={22} />} label="Collections" />
        <NavItem href="/account/user" icon={<User size={22} />} label="Account" />
        <NavItem href="/cart" icon={<ShoppingBag size={22} />} label="Cart" />
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon, label }) => (
  <Link href={href} className="flex flex-col items-center text-xs text-gray-600 hover:text-black">
    {icon}
    <span className="mt-1">{label}</span>
  </Link>
);

export default BottomNav;
