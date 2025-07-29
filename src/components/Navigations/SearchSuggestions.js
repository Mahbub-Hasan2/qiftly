'use client';

import Link from "next/link";

export default function SearchSuggestions({
  show,
  results = [],
  loading,
  onSuggestedClick = () => { },
  query = '',
  relatedTerms = []
}) {
  const suggestedTerms = [
    'perfume',
    'flowers',
    'birthday gift',
    'mug',
    'anniversary',
    'islamic art'
  ];

  if (!show) return null;

  const showInitialSuggestions = query.trim().length < 2;

  return (
    <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg p-4">
      {showInitialSuggestions ? (
        <>
          <p className="text-sm text-gray-600 mb-2 font-medium">Try searching for:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTerms.map((term, i) => (
              <button
                key={i}
                onClick={() => onSuggestedClick(term)}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
              >
                {term}
              </button>
            ))}
          </div>
        </>
      ) : loading ? (
        <p className="text-sm text-gray-500">Searching...</p>
      ) : results.length === 0 ? (
        <p className="text-sm text-gray-500">No results found</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
            {results.map((product) => (
              <Link key={product.id} href={`/products/${product.handle}`}>
                <div
                 
                  className="border rounded-xl p-2 hover:shadow transition"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="rounded-md mb-1 w-full h-24 object-cover"
                  />
                  <p className="text-sm font-semibold">
                    {product.price} {product.currency}
                  </p>
                  <p className="text-xs text-gray-600 truncate">{product.title}</p>
                </div>
              </Link>

            ))}
          </div>

          {relatedTerms.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2 font-medium">You might also like:</p>
              <div className="flex flex-wrap gap-2">
                {relatedTerms.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => onSuggestedClick(term)}
                    className="text-xs bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded-full"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
