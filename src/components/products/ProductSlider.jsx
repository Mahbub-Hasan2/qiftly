"use client";

import { useRef, useState, useEffect } from "react";
import ProductCard from "../cards/ProductCard";
import { useProductFilter } from "../hooks/useProductFilter";
import CategoryTabs from "../ui/CategoryTabs";
import { SliderArrows } from "../ui/SliderArrows";

export default function ProductSlider({
  products = [],
  defaultCategories = [],
  title = "Products",
  subtitle = "",
  filterKey = "tags",
  showProductsCategory = true,
  initialActiveCategory = "",
}) {
  const containerRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const {
    categories,
    activeCategory,
    setActiveCategory,
    filteredProducts,
  } = useProductFilter(
    products,
    filterKey,
    defaultCategories,
    showProductsCategory,
    initialActiveCategory
  );

  // Scroll check
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
    <div className="w-full px-0 md:py-10 py-5 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-center md:text-start text-center gap-4 font-poppins md:mb-4">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
          {subtitle && (
            <p className="text-sm font-semibold text-gray-500">{subtitle}</p>
          )}
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
      </div>


      {/* Arrows */}
      <SliderArrows showLeft={showLeft} showRight={showRight} onScroll={scroll} />

      {/* Product Slider */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar md:gap-0.5 gap-1 relative" >

        {filteredProducts.length === 0 ? (
          <p className="text-center w-full py-10 text-gray-500">
            কোনো প্রোডাক্ট পাওয়া যায়নি।
          </p>
        ) : (
          filteredProducts.map((product, idx) => (
            <div
              key={idx}
              className={`shrink-0 w-1/2 sm:w-1/3 lg:w-1/4 transition-all ${idx === 0 ? 'pl-0 pr-1.5 md:pr-2' : 'px-1.5 md:px-3'
                }`}
            >
              <ProductCard product={product} activeCategory={activeCategory} />
            </div>
          ))
        )}
      </div>
      {/* <div className="flex items-center justify-center my-4">
        <div className="border-t border-gray-300 w-1/4" />
        <span className="mx-2 text-sm text-gray-400">Explore More</span>
        <div className="border-t border-gray-300 w-1/4" />
      </div> */}

    </div>
  );
}
