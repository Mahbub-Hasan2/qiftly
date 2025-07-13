'use client';
import Image from 'next/image';

export default function SearchSuggestions({ show, collections, trendingGifts }) {
  if (!show) return null;

  return (
    <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg p-4">
      {/* Collections */}
      <h4 className="font-semibold text-sm mb-2">Collections</h4>
      <div className="flex flex-wrap gap-2 mb-4">
        {collections.map((item, i) => (
          <button
            key={i}
            className="bg-gray-100 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Trending Gifts */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-sm">Trending Gifts</h4>
        <a className="text-sm text-yellow-700 hover:underline cursor-pointer">
          View All
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {trendingGifts.map((gift) => (
          <div
            key={gift.id}
            className="border rounded-xl p-2 hover:shadow transition"
          >
            <img
              src={gift.image}
              alt={gift.name}
              className="rounded-md mb-1 w-full h-24 object-cover"
            />
            <p className="text-sm font-semibold">{gift.price}</p>
            <p className="text-xs text-gray-600 truncate">{gift.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
