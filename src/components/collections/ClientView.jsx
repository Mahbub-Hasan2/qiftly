"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/cards/ProductCard";
import { LayoutGrid, LayoutList, X } from "lucide-react";

export default function ClientView({ initialProducts, allProducts }) {
  const [view, setView] = useState("grid");
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
const [showFilters, setShowFilters] = useState(true);

  // সব ইউনিক ট্যাগ (all products থেকে)
  const allTags = useMemo(() => {
    const tags = new Set();
    allProducts.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [allProducts]);

  // ফিল্টার এবং সর্ট
  const filteredProducts = useMemo(() => {
  let result = selectedTag
    ? allProducts.filter((p) => p.tags?.includes(selectedTag))
    : [...initialProducts];

  switch (sortBy) {
    case "low-to-high":
      result.sort(
        (a, b) =>
          parseFloat(a?.priceRange?.minVariantPrice?.amount || 0) -
          parseFloat(b?.priceRange?.minVariantPrice?.amount || 0)
      );
      break;
    case "high-to-low":
      result.sort(
        (a, b) =>
          parseFloat(b?.priceRange?.minVariantPrice?.amount || 0) -
          parseFloat(a?.priceRange?.minVariantPrice?.amount || 0)
      );
      break;
    case "newest":
      result = [...result].reverse(); // যদি নতুন গুলো শেষে থাকে
      break;
  }

  return result;
}, [initialProducts, allProducts, selectedTag, sortBy]);


  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Filters + Sort + View */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setSelectedTag((prev) => (prev === tag ? null : tag))
              }
              className={`px-3 py-1 rounded-full border text-sm ${
                selectedTag === tag
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="ml-2 text-sm text-red-500 flex items-center"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Filter
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>

          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-md ${
              view === "grid" ? "bg-black text-white" : "text-gray-500"
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-md ${
              view === "list" ? "bg-black text-white" : "text-gray-500"
            }`}
          >
            <LayoutList className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product View */}
      <div
        className={`${
          view === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            : "flex flex-col gap-4"
        }`}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} view={view} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No products found for the selected filter.
          </p>
        )}
      </div>
    </div>
  );
}
