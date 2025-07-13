'use client';

import { useState } from 'react';
import MegaMenu from './MegaMenu';
import SearchInput from './SearchInput';
import HeaderIcons from './HeaderIcons';
import QiftlyLogo from "../../assets/images/Qiftly_logo__2_.png";
import Image from 'next/image';

export default function Navbar() {
  const [isMobileSearch, setIsMobileSearch] = useState(false);

  return (
    <nav className="bg-white shadow pt-3">
      {isMobileSearch && (
        <SearchInput mobile={true} onBack={() => setIsMobileSearch(false)} />
      )}

      <div className="max-w-7xl mx-auto px-4 py-3 gap-x-10 flex items-center justify-between border-b border-gray-200 relative">
        <Image
          src={QiftlyLogo}
          width={120}
          height={40}
          alt="Qiftly Logo"
          priority
        />

        {/* Desktop Search */}
        <div className="hidden lg:flex mr-auto w-1/2">
          <div className="w-full mx-auto">
            <SearchInput />
          </div>
        </div>

        {/* Icons */}
        <HeaderIcons setIsMobileSearch={setIsMobileSearch} />
      </div>

      <div className="hidden lg:block">
        <MegaMenu />
      </div>
    </nav>
  );
}
