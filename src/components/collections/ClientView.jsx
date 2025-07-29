"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/cards/ProductCard";
import { LayoutGrid, LayoutList, X } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ClientView({ initialProducts, allProducts, title }) {
  const [view, setView] = useState("grid");
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
  const [showTagPanel, setShowTagPanel] = useState(false);

  // ইউনিক ট্যাগ গুলো
  const allTags = useMemo(() => {
    const tags = new Set();
    allProducts.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [allProducts]);

  // ফিল্টার + সর্ট
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
        result = [...result].reverse();
        break;
    }

    return result;
  }, [initialProducts, allProducts, selectedTag, sortBy]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:py-6 py-4">
      {/* Header Title */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className={`${selectedTag ? "hidden sm:inline " : ""} "text-2xl font-semibold text-gray-800"`}>
            {selectedTag ? selectedTag : title.charAt(0).toUpperCase() + title.slice(1)}
          </h1>
          {selectedTag && (
            <div className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-700">
              <span className="">Filtered by:</span>
              <strong>{selectedTag}</strong>
              <button onClick={() => setSelectedTag(null)} className="cursor-pointer">
                <X className="w-4 h-4 text-red-500 hover:text-red-600 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setShowTagPanel(true)}
          className="flex items-center gap-2 border px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </button>

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
            className={`p-2 rounded-md ${view === "grid" ? "bg-black text-white" : "text-gray-500"
              }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-md ${view === "list" ? "bg-black text-white" : "text-gray-500"
              }`}
          >
            <LayoutList className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tag Panel (Slide-in) */}
      <AnimatePresence>
        {showTagPanel && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTagPanel(false)}
            />

            {/* Sliding Panel */}
            <motion.div
              className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl p-4 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filter by Tag</h2>
                <button onClick={() => setShowTagPanel(false)}>
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setSelectedTag((prev) => (prev === tag ? null : tag))
                    }
                    className={`px-3 py-2 rounded-md text-left text-sm border ${selectedTag === tag
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
                    className="text-sm text-red-500 flex items-center mt-2"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear Filter
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Grid/List */}
      <div
        className={`${view === "grid"
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
