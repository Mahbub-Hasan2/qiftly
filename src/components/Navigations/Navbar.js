'use client';

import MegaMenu from './MegaMenu';
import SearchInput from './SearchInput';
import HeaderIcons from './HeaderIcons';
import QiftlyLogo from "../../assets/images/Qiftly_logo__2_.png";
import Image from 'next/image';
import Link from 'next/link';
import { useUI } from '../contexts/UIContext';

export default function Navbar({menuItems}) {
    const { isMobileSearch, setIsMobileSearch, isFocused, setIsFocused } = useUI();

    return (
        <nav className="bg-white shadow pt-3">
            {/* Mobile Fullscreen Search Overlay */}
            {isMobileSearch && (
                <div className="fixed top-0 left-0 w-full h-[64px] bg-white z-50 flex items-center pl-1 pr-4 shadow-md lg:hidden">
                    <button onClick={() => setIsMobileSearch(false)} className="mr-2 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-800 size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <div className="flex-1">
                        <SearchInput isFocused={isFocused} setIsFocused={setIsFocused} />
                    </div>
                </div>
            )}

            {/* Top nav area */}
            <div className="max-w-7xl mx-auto px-4 py-3 gap-x-10 flex items-center justify-between border-b border-gray-200 relative">
                <Link href="/">
                    <Image
                        src={QiftlyLogo}
                        width={120}
                        height={40}
                        alt="Qiftly Logo"
                        priority
                        className="w-[100px] h-auto sm:w-[120px]" // ✅ মোবাইলে সাইজ ছোট
                    />
                </Link>

                {/* Desktop Search */}
                <div className="hidden lg:flex mr-auto w-1/2">
                    <div className="w-full mx-auto">
                        <SearchInput isFocused={isFocused} setIsFocused={setIsFocused} />
                    </div>
                </div>

                {/* Icons */}
                <HeaderIcons setIsMobileSearch={setIsMobileSearch} setIsFocused={setIsFocused} />
            </div>

            {/* Mega Menu - only on desktop */}
            <div className="hidden lg:block">
                <MegaMenu menuItems={menuItems} />
            </div>
        </nav>
    );
}
