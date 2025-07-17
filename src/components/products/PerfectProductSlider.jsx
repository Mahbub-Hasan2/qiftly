'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import Link from 'next/link';

export default function PerfectProductSlider({ products }) {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">The Perfect Picks Await</h2>
        <p className="text-gray-500">Top Trends & Timeless Bestsellers</p>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto no-scrollbar space-x-4 snap-x snap-mandatory max-w-full">
          {products.map((product, index) => (
            <div
              key={product.id || index}
              className={`relative bg-white border rounded-xl p-4 flex-shrink-0 snap-center transition-all duration-300 shadow hover:shadow-lg ${
                index === current ? 'ring-2 ring-olive-500' : ''
              }`}
              style={{ width: '250px' }} // Fixed width per card for consistent scroll
            >
              <Link href={`/products/${product.handle}`} className="block">
                <div className="relative group">
                  <img
                    src={product.images?.edges[0]?.node.src || '/placeholder.png'}
                    alt={product.images?.edges[0]?.node.altText || product.title}
                    className="w-full h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition">
                    <Eye className="w-5 h-5 text-gray-600" />
                  </div>
                </div>

                <h3 className="mt-4 text-sm font-medium text-gray-700 line-clamp-2">{product.title}</h3>

                <p className="text-primary font-semibold mt-2 text-lg">
                  QAR {product.variants?.edges[0]?.node.price.amount || 'N/A'}
                </p>
              </Link>

              {index === current && (
                <>
                  <button
                    onClick={prev}
                    className="absolute top-1/2 -left-3 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <button
                    onClick={next}
                    className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
                  >
                    <ArrowRight size={18} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 w-5 rounded-full transition-all duration-300 ${
                idx === current ? 'bg-olive-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          href="/collections/all"
          className="inline-block px-8 py-3 bg-olive-500 hover:bg-olive-600 text-white text-sm rounded-full shadow transition"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
