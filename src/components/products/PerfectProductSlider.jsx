'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Love in Layers Combo',
    price: 295,
    image: '/products/love-layers.png', // আপনার ইমেজ লিংক বসাবেন
    link: '/product/love-in-layers',
  },
  {
    id: 2,
    name: 'Warmth & Wellness',
    price: 180,
    image: '/products/warmth.png',
    link: '/product/warmth-wellness',
  },
  {
    id: 3,
    name: 'Red Roses & Cake Combo',
    price: 220,
    image: '/products/red-roses.png',
    link: '/product/red-roses-cake',
  },
  {
    id: 4,
    name: 'Squid Game Cake',
    price: 130,
    image: '/products/squid-cake.png',
    link: '/product/squid-game-cake',
  },
];

export default function PerfectProductSlider({ products }) {
  console.log(products)
  const [selected, setSelected] = useState(null);
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">The Perfect Picks Await</h2>
      <p className="text-gray-500 mb-4">Top Trends & Timeless Bestsellers</p>

      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`relative border rounded-xl p-4 min-w-[250px] flex-shrink-0 transition-all duration-300 shadow-sm ${
              index === current ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
              New Arrival
            </div>

            <Link href={product.link}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
            </Link>

            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">QAR {product.price}</p>
              <Link href={product.link}>
                <Eye className="w-5 h-5 text-gray-600 hover:text-primary transition" />
              </Link>
            </div>

            <h3 className="text-base mt-2 text-gray-700">{product.name}</h3>

            {/* Navigation Arrows */}
            {index === current && (
              <>
                <button
                  onClick={prev}
                  className="absolute top-1/2 -left-3 transform -translate-y-1/2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"
                >
                  <ArrowLeft size={16} />
                </button>

                <button
                  onClick={next}
                  className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"
                >
                  <ArrowRight size={16} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link
          href="/collections/all"
          className="px-6 py-2 bg-olive-500 hover:bg-olive-600 text-white rounded-full transition"
        >
          View All
        </Link>
      </div>
    </div>
  );
}
