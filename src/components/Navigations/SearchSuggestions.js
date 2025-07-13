'use client';
import Image from 'next/image';

export default function SearchSuggestions({ show, collections, trendingGifts, isMobile, onClose }) {
  if (!show) return null;

  return (
    <>
      {/* Desktop suggestion box */}
      {!isMobile && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg p-4">
          <h4 className="font-semibold text-sm mb-2">Collections</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {collections.map((item, i) => (
              <span key={i} className="bg-gray-100 text-sm px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer">
                {item}
              </span>
            ))}
          </div>
          <h4 className="font-semibold text-sm mb-2">Trending Gifts</h4>
          <div className="grid grid-cols-2 gap-3">
            {trendingGifts.map((gift) => (
              <div key={gift.id} className="border rounded-md p-2 hover:shadow transition">
                <Image src={gift.image} alt={gift.name} width={200} height={100} className="w-full h-24 object-cover rounded" />
                <p className="text-sm font-semibold">{gift.price}</p>
                <p className="text-xs text-gray-600 truncate">{gift.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile suggestion overlay */}
      {isMobile && (
        <div className="mt-4">
          <h4 className="font-semibold text-sm mb-2">Collections</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {collections.map((item, i) => (
              <span key={i} className="bg-gray-100 text-sm px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer">
                {item}
              </span>
            ))}
          </div>

          <h4 className="font-semibold text-sm mb-2">Trending Gifts</h4>
          <div className="grid grid-cols-2 gap-3">
            {trendingGifts.map((gift) => (
              <div key={gift.id} className="border rounded-md p-2 hover:shadow transition">
                <Image src={gift.image} alt={gift.name} width={200} height={100} className="w-full h-24 object-cover rounded" />
                <p className="text-sm font-semibold">{gift.price}</p>
                <p className="text-xs text-gray-600 truncate">{gift.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
