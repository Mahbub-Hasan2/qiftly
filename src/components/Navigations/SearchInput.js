'use client';

import { useEffect, useRef, useState } from 'react';
import SearchSuggestions from './SearchSuggestions';
import { searchProducts } from '@/lib/data';

export default function SearchInput({ isFocused, setIsFocused }) {
  const [relatedTerms, setRelatedTerms] = useState([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length > 1) {
        setLoading(true);
        searchProducts(query)
          .then((data) => {
            setSuggestions(data);

            // Related suggestions তৈরি
            const tags = new Set();
            data.forEach((item) => {
              item.tags?.forEach((tag) => tags.add(tag.toLowerCase()));
            });
            setRelatedTerms([...tags].slice(0, 6)); // প্রথম ৬ টা সাজেশন রাখো
          })
          .finally(() => setLoading(false));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSuggestedClick = (term) => {
    setQuery(term);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
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
          <button onClick={() => setQuery('')} className="text-gray-400 hover:text-black px-3">
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

      <SearchSuggestions
        show={isFocused}
        loading={loading}
        results={suggestions}
        query={query}
        onSuggestedClick={handleSuggestedClick}
        relatedTerms={relatedTerms}
      />

    </div>
  );
}
