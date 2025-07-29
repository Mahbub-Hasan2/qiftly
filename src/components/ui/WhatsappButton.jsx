'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function WhatsappButton() {
  const [showButton, setShowButton] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        // নিচের দিকে গেলে দেখাও
        setShowButton(true);
      } else {
        // উপরের দিকে গেলে হাইড করো
        setShowButton(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  if (!showButton || pathname !== '/') return null;

  return (
    <a
      href="https://wa.me/9743067136"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-17 right-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M20.52 3.48A11.93 11.93 0 0012 0a11.94 11.94 0 00-10.2 18L0 24l6.28-1.65A11.94 11.94 0 0012 24a11.93 11.93 0 008.52-20.52zM12 21.43a9.39 9.39 0 01-4.91-1.37l-.35-.21-3.73.98 1-3.62-.23-.37A9.4 9.4 0 1121.43 12 9.45 9.45 0 0112 21.43zm5.31-7.2c-.29-.14-1.72-.85-1.99-.95s-.46-.14-.65.14-.75.95-.91 1.14-.34.21-.63.07a7.72 7.72 0 01-2.26-1.39 8.5 8.5 0 01-1.58-1.96c-.17-.29 0-.45.13-.59.13-.14.29-.34.43-.51s.17-.29.26-.48a.56.56 0 000-.53c-.08-.15-.65-1.56-.9-2.14s-.47-.49-.64-.5H7.4a1 1 0 00-.72.34A3 3 0 006 9.15a5.25 5.25 0 001.1 2.71 11.81 11.81 0 004.7 4.33 16.64 16.64 0 002.69 1 6.37 6.37 0 003 .2 2.5 2.5 0 001.65-1.17 2 2 0 00.14-1.18c-.06-.11-.25-.18-.53-.32z" />
      </svg>
    </a>
  );
}
