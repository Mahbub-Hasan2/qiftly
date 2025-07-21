"use client";

import { useRef, useState, useEffect } from "react";
import ProductCard from "../cards/ProductCard";
import { useProductFilter } from "../hooks/useProductFilter";
import CategoryTabs from "../ui/CategoryTabs";
import { SliderArrows } from "../ui/SliderArrows";

export default function PerfectProductSlider({ products }) {
  const containerRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const {
    categories,
    activeCategory,
    setActiveCategory,
    filteredProducts,
  } = useProductFilter(products, "productType");

  // Scroll logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    checkScroll();
    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [filteredProducts]);

  const scroll = (dir) => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = container.querySelector("div")?.offsetWidth || 300;
    container.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <div className="w-full px-4 py-6 relative">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {activeCategory ? activeCategory : "All Products"}
        </h2>
        <p className="text-sm text-gray-500">
          Showing products in category: {activeCategory || "All"}
        </p>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Arrows */}
      <SliderArrows showLeft={showLeft} showRight={showRight} onScroll={scroll} />

      {/* Product Slider */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar md:gap-1 gap-0 relative"
        style={{
          paddingLeft: showLeft ? "2.5rem" : undefined,
          paddingRight: showRight ? "2.5rem" : undefined,
        }}
      >
        {filteredProducts.length === 0 ? (
          <p className="text-center w-full py-10 text-gray-500">কোনো প্রোডাক্ট পাওয়া যায়নি।</p>
        ) : (
          filteredProducts.map((product, idx) => (
            <div key={idx} className="shrink-0 px-2 md:px-2 w-1/2 sm:w-1/3 lg:w-1/4 transition-all">
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
