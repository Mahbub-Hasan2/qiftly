// components/ProductInfo.js
import { BadgeCheck } from "lucide-react";

export default function ProductInfo({ product }) {
  const { title, priceRange, tags, availableForSale, totalInventory } = product;
  const { amount, currencyCode } = priceRange?.minVariantPrice || {};
  const isBestSeller = tags?.includes("Best Sellers");
  const isNewArrival = !isBestSeller && tags?.includes("New Arrivals");

  return (
    <div className="space-y-6 text-gray-800 font-sans">
      {/* Title and Price */}
      <div>
        <h1 className="md:text-3xl text-xl font-semibold text-gray-900 leading-snug">
          {title}
        </h1>
        <p className="text-xl font-bold text-green-700 mt-2">
          {currencyCode} {amount}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {isBestSeller && (
          <span className="inline-block bg-orange-400 text-white text-sm font-medium px-3 py-1 rounded-full">
            🔥 Best Seller
          </span>
        )}
        {isNewArrival && (
          <span className="inline-block bg-gray-700 text-white text-sm font-medium px-3 py-1 rounded-full">
            🆕 New Arrival
          </span>
        )}
        {availableForSale && (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            <BadgeCheck size={14} />
            In Stock ({totalInventory})
          </span>
        )}
      </div>

      {/* Add to Cart */}
      <div>
        <button className="w-full bg-primary hover:bg-primary text-white text-base font-medium px-6 py-3 rounded-lg shadow-md transition-all">
          Add to Cart
        </button>
      </div>

      {/* Placeholder for future Tabs */}
      <div className="pt-6 border-t text-sm text-gray-500 italic">
        Product Details, How to Care, Delivery Info coming below...
      </div>
    </div>
  );
}
