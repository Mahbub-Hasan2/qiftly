"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Menu as MenuIcon, ChevronRight, ChevronLeft, Grid } from "lucide-react";

export default function MobileMegaMenu({ menuItems }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [activePath, setActivePath] = useState("/");

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => {
        setIsOpen(false);
        setActiveMenu(null);
    };

    const extractCollectionHandle = (url) => {
        const match = url?.match(/\/collections\/([^\/\?#]+)/);
        return match ? match[1] : null;
    };

    return (
        <>
            {/* Toggle Button */}

            <div onClick={toggleMenu} className="flex flex-col items-center text-xs text-primary hover:text-gray-600 focus:outline-none">
                <Grid size={22} />
                <span className="mt-1">Collections</span>
            </div>

            {/* Main Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-80 bg-white z-[100] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-orange-50 to-white">
                    <h2 className="text-base font-bold tracking-wide uppercase text-orange-600">Browse Categories</h2>
                    <button onClick={closeMenu} className="hover:text-red-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Menu Items */}
                <ul className="p-4 space-y-3">
                    <li>
                        <Link
                            href="/"
                            onClick={() => {
                                setActivePath("/");
                                closeMenu();
                            }}
                            className={`block font-semibold transition rounded px-3 py-2 shadow-sm ${activePath === "/" ? "bg-orange-100 text-orange-600" : "text-gray-800 hover:bg-orange-50 hover:text-orange-500"
                                }`}
                        >
                            🏠 Home
                        </Link>
                    </li>

                    {menuItems.map((menu, idx) => {
                        const hasChildren = menu.children?.length > 0;
                        const path = extractCollectionHandle(menu.url);

                        return (
                            <li key={idx}>
                                {hasChildren ? (
                                    <button
                                        onClick={() => setActiveMenu(idx)}
                                        className="flex items-center justify-between w-full text-left font-semibold text-gray-800 hover:text-orange-500 transition px-3 py-2 rounded hover:bg-orange-50"
                                    >
                                        {menu.label}
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                ) : path ? (
                                    <Link
                                        href={`/collections/${path}`}
                                        onClick={() => {
                                            setActivePath(`/collections/${path}`);
                                            closeMenu();
                                        }}
                                        className={`block font-semibold transition rounded px-3 py-2 shadow-sm ${activePath === `/collections/${path}`
                                                ? "bg-orange-100 text-orange-600"
                                                : "text-gray-800 hover:bg-orange-50 hover:text-orange-500"
                                            }`}
                                    >
                                        {menu.label}
                                    </Link>
                                ) : (
                                    <span className="text-gray-500 font-medium">{menu.label}</span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Sub Menu Drawer */}
            {activeMenu !== null && (
                <div className="fixed top-0 left-0 h-full w-80 bg-white z-[101] shadow-2xl transform transition-transform duration-300 ease-in-out">
                    <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-orange-50 to-white">
                        <button
                            onClick={() => setActiveMenu(null)}
                            className="flex items-center text-sm font-semibold text-gray-600 hover:text-orange-500 transition"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            <span className="tracking-wide">Back</span>
                        </button>
                        <button onClick={closeMenu} className="hover:text-red-500">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Premium Styled Submenu */}
                    <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-60px)] scroll-smooth">
                        {(() => {
                            const groups = {};
                            menuItems[activeMenu]?.children?.forEach((child) => {
                                const tag = child.tags?.[0] || "Others";
                                if (!groups[tag]) groups[tag] = [];
                                groups[tag].push(child);
                            });

                            return Object.entries(groups).map(([tag, items], idx) => (
                                <div
                                    key={idx}
                                    className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
                                >
                                    <h4 className="text-xs font-bold uppercase text-gray-700 mb-3 tracking-widest flex items-center gap-2 relative">
                                        <span className="inline-block w-2 h-2 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full" />
                                        {tag}
                                        <span className="absolute left-0 bottom-[-2px] w-10 h-[2px] bg-orange-200 rounded-full blur-sm" />
                                    </h4>

                                    <ul className="space-y-1">
                                        {items.map((child, j) => {
                                            const childPath = `/collections/${extractCollectionHandle(child.url)}`;
                                            const isActive = activePath === childPath;

                                            return (
                                                <li key={j}>
                                                    <Link
                                                        href={childPath}
                                                        onClick={() => {
                                                            setActivePath(childPath);
                                                            closeMenu();
                                                        }}
                                                        className={`group flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                                                                ? "bg-orange-100 text-orange-600 shadow-inner"
                                                                : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                                                            }`}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            {isActive && (
                                                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                                            )}
                                                            {child.label}
                                                        </span>
                                                        <span className="text-xs opacity-0 group-hover:opacity-100 text-orange-400 transition">
                                                            →
                                                        </span>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ));
                        })()}
                    </div>
                </div>
            )}

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-50 md:hidden backdrop-blur-sm"
                    onClick={closeMenu}
                ></div>
            )}
        </>
    );
}
