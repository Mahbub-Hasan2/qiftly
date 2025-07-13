'use client';

import MegaMenu from './MegaMenu';
import SearchInput from './SearchInput';
import HeaderIcons from './HeaderIcons';

export default function Navbar() {

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-3 gap-x-10 flex items-center justify-between border-b border-gray-200">
                <h1 className="text-xl font-bold">Qiftly</h1>

                {/* Big search bar  */}
                <div className="flex mr-auto w-1/2">
                    <div className="w-full max-w-xl mx-auto">
                        <SearchInput />
                    </div>
                </div>



                {/* icons  */}
                <HeaderIcons />
            </div>

            {/* mega menu  */}
            <MegaMenu />
        </nav>
    );
}
