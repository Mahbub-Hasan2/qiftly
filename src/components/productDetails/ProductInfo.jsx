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

      <div className="rounded-2xl border border-gray-100 p-5">
        <h3 className="md:block hidden font-poppins font-bold mb-3 text-base md:text-lg">Ways to pay:</h3>

        <div className="flex flex-wrap items-center gap-3">
          <img className="h-8 md:h-10" src="https://cdn.shopify.com/s/files/1/0766/6365/2609/files/mastercard_95b29551-18c2-48dc-99b8-2fca8a8f96a3.avif?v=1753425634" alt="Mastercard" />
          <img className="h-8 md:h-10" src="https://cdn.shopify.com/s/files/1/0766/6365/2609/files/visa_5badd0b9-dbaf-4a2d-a7b0-eb88cb755c3d.avif?v=1753425634" alt="Visa" />
          <img className="h-8 md:h-10" src="https://cdn.shopify.com/s/files/1/0766/6365/2609/files/apple-pay_ca03f924-a38d-40f6-8d1b-77cb18f97daf.webp?v=1753425634" alt="Apple Pay" />
          <img className="h-8 md:h-10" src="https://cdn.shopify.com/s/files/1/0766/6365/2609/files/naps_41c4c8ba-377a-4ea9-b9f2-eaceb40c4d3e.webp?v=1753425634" alt="NAPS" />
          <img className="h-8 md:h-10" src="https://cdn.shopify.com/s/files/1/0766/6365/2609/files/gpay_c6643f18-fc38-4ed1-964e-abb6e8420b3f.avif?v=1753425634" alt="GPay" />
          <img className="h-8 md:h-10" src="https://cdn.shopify.com/s/files/1/0766/6365/2609/files/amex.avif?v=1753425633" alt="AMEX" />
          <img className="h-8 md:h-10" src="https://cdn.shopify.com/s/files/1/0766/6365/2609/files/COD_Icon_34c5679d-9814-49a7-af5e-2c5680f57642.avif?v=1753425634" alt="Cash on Delivery" />
        </div>
      </div>

    </div>
  );
}
