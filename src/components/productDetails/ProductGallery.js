"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ product }) {
  const images = product.images?.edges || [];
  const imageUrls = images.map((img) => img.node?.url).filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const changeImage = (newIndex) => {
    setFade(true); // trigger fade
    setTimeout(() => {
      setActiveIndex(newIndex);
      setFade(false);
    }, 200); // duration must match animation timing
  };

  const prevImage = () => {
    changeImage(activeIndex === 0 ? imageUrls.length - 1 : activeIndex - 1);
  };

  const nextImage = () => {
    changeImage(activeIndex === imageUrls.length - 1 ? 0 : activeIndex + 1);
  };

  const handleImageClick = (index) => {
    changeImage(index);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const delta = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (delta > minSwipeDistance) {
      nextImage();
    } else if (delta < -minSwipeDistance) {
      prevImage();
    }
  };

  const activeImage = imageUrls[activeIndex] || "/placeholder.jpg";

  return (
    <div className="space-y-4">
      {/* Main Image with swipe and smooth fade */}
      <div
        className="relative border rounded-xl overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={activeImage}
          alt={product.title}
          width={600}
          height={600}
          className={`object-cover w-full transition-opacity duration-300 ease-in-out ${fade ? "opacity-0" : "opacity-100"}`}
        />

        {/* Slide Buttons */}
        {imageUrls.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-2 overflow-x-auto">
        {imageUrls.map((url, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => handleImageClick(idx)}
              className={`w-20 h-20 rounded-md border shrink-0 overflow-hidden ${
                isActive ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <Image
                src={url || "/placeholder.jpg"}
                alt={`${product.title} ${idx}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
