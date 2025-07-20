'use client';

import { useEffect, useRef, useState } from 'react';
import SearchSuggestions from './SearchSuggestions';

export default function SearchInput({ isFocused, setIsFocused }) {
  const [query, setQuery] = useState('');

  const wrapperRef = useRef(null); // সার্চ ইনপুট ও সাজেশন সহ সব কভার করবে
  const inputRef = useRef(null);   // ইনপুট ফোকাসের জন্য

  const collections = [
    'Birthday Cake', 'Buy Balloons', 'Flower Shop',
    'Tulips Flowers', 'Buy Chocolates', 'Buy Candles',
    'Cake Shop', 'Buy Perfumes',
  ];

  const trendingGifts = [
    {
      id: 1,
      name: 'Birthday Labubu Mischief Cake',
      price: 'QAR 380',
      image: '/cake1.png',
    },
    {
      id: 2,
      name: 'Squid Squad Celebration Cake',
      price: 'QAR 130',
      image: '/cake2.png',
    },
    {
      id: 3,
      name: 'Ghibli Printed Mug',
      price: 'QAR 120',
      image: '/cake3.png',
    },
  ];

  // Auto-focus when `isFocused` becomes true
  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  // Outside click detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Input box */}
      <div className="flex items-center w-full border border-gray-500 rounded-md overflow-hidden bg-white focus-within:ring-1 focus-within:ring-gray-500 hover:ring-1 hover:ring-gray-500 transition">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for something..."
          className="w-full px-3 py-2.5 outline-none"
        />

        {query && (
          <button
            onClick={() => setQuery('')}
            className="text-gray-400 hover:text-black px-3"
          >
            ×
          </button>
        )}

        <div className="h-5 w-px bg-gray-200" />

        <button className="px-3 text-gray-600 hover:text-yellow-700 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      {/* Suggestions */}
      <SearchSuggestions
        show={isFocused}
        collections={collections}
        trendingGifts={trendingGifts}
      />
    </div>
  );
}
