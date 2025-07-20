"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import ProductCard from "../cards/ProductCard";

export default function PerfectProductSlider({ products }) {
  const containerRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  // Scroll check logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    checkScroll(); // Initial check

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // Scroll trigger
  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = container.querySelector("div")?.offsetWidth || 300;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative px-4 py-10">
      {/* Navigation Arrows */}
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white p-2 shadow-md rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white p-2 shadow-md rounded-full"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      )}

      {/* Product Cards Container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar gap-4"
      >
        {products.map((product, idx) => (
          <div
            key={idx}
            className="
              shrink-0
              w-1/2        // 2 cards on mobile
              sm:w-1/3     // 3 cards on small tablets
              lg:w-1/4     // 4 cards on laptop and up
              transition-all
            "
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
