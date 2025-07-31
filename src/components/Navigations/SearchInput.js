'use client';

import { useState, useRef, useEffect } from 'react';
import SearchSuggestions from './SearchSuggestions';
import { searchProducts } from '@/lib/data';

export default function SearchInput({ isFocused, setIsFocused }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [relatedTerms, setRelatedTerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  // Autofocus if needed
  useEffect(() => {
    if (isFocused) inputRef.current?.focus();
  }, [isFocused]);

  // Detect outside clicks (desktop + mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [wrapperRef]);

  // Search debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim().length > 1) {
        setLoading(true);
        searchProducts(query).then((data) => {
          setSuggestions(data);
          const tags = new Set();
          data.forEach((item) => {
            item.tags?.forEach((tag) => tags.add(tag.toLowerCase()));
          });
          setRelatedTerms([...tags].slice(0, 6));
        }).finally(() => setLoading(false));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  const handleSuggestedClick = (term) => {
    setQuery(term);
    setIsFocused(false); // সিলেক্ট করলে হাইড করো
  };

  return (
    <div ref={wrapperRef} className="relative w-full z-50">
      <div className="flex items-center w-full border border-gray-400 rounded-md bg-white focus-within:ring-2 ring-gray-500 shadow-sm">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search products..."
          className="w-full px-3 py-2 outline-none"
        />

        {query && (
          <button
            onClick={() => setQuery('')}
            className="px-2 text-gray-500 hover:text-black"
            aria-label="Clear"
          >
            ×
          </button>
        )}
        <button
          className="px-3 text-gray-600 hover:text-black"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.5-4.5M17 10a7 7 0 1 0-14 0 7 7 0 0 0 14 0Z" />
          </svg>
        </button>
      </div>

      {/* Suggestion box */}
      {isFocused && (
        <SearchSuggestions
          show={isFocused}
          loading={loading}
          results={suggestions}
          query={query}
          onSuggestedClick={handleSuggestedClick}
          relatedTerms={relatedTerms}
        />
      )}
    </div>
  );
}
