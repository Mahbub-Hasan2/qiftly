'use client';

import { useState } from 'react';
import SearchSuggestions from './SearchSuggestions';

export default function SearchInput({ mobile = false, onBack }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const collections = ['Birthday Cake', 'Buy Balloons', 'Flower Shop', 'Tulips Flowers'];
  const trendingGifts = [
    { id: 1, name: 'Birthday Cake', image: '/cake1.png', price: 'QAR 380' },
    { id: 2, name: 'Ghibli Mug', image: '/cake2.png', price: 'QAR 120' },
  ];

  const closeSearch = () => setIsFocused(false);

  if (mobile) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-white z-50 p-4 overflow-y-auto">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-3 text-2xl">←</button>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border border-gray-300 px-3 py-2 rounded-md"
            placeholder="Search..."
          />
          {query && (
            <button onClick={() => setQuery('')} className="ml-2 text-gray-500">×</button>
          )}
        </div>

        <SearchSuggestions
          show={true}
          collections={collections}
          trendingGifts={trendingGifts}
          isMobile={true}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center w-full border border-gray-300 rounded-md overflow-hidden bg-white focus-within:ring-1 focus-within:ring-gray-500 hover:ring-1 hover:ring-gray-500 transition">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search for something..."
          className="w-full px-3 py-2.5 outline-none"
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-gray-400 hover:text-black px-3">
            ×
          </button>
        )}
        <div className="h-5 w-px bg-gray-200" />
        <button className="px-3 text-gray-600 hover:text-yellow-700 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197M15.803 15.803A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </div>

      <SearchSuggestions
        show={isFocused}
        collections={collections}
        trendingGifts={trendingGifts}
        isMobile={false}
      />
    </div>
  );
}
