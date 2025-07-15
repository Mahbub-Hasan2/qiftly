'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    desktopImg: 'https://www.fnp.qa/cdn/shop/files/Artboard_74_copy_6_5.png',
    mobileImg: 'https://www.fnp.qa/cdn/shop/files/ENGLISH_14.png',
    link: '/collections/royale-selection'
  },
  {
    id: 2,
    desktopImg: 'https://www.fnp.qa/cdn/shop/files/Artboard_74_copy_6_4.png',
    mobileImg: 'https://www.fnp.qa/cdn/shop/files/Artboard_69_copy_6_3.png',
    link: '/collections/new-arrivals'
  },
  {
    id: 3,
    desktopImg: 'https://www.fnp.qa/cdn/shop/files/Artboard_74_copy_6_3.png',
    mobileImg: 'https://www.fnp.qa/cdn/shop/files/ENGLISH_14.png',
    link: '/collections/best-sellers'
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  const nextSlide = () => {
    if (current < slides.length - 1) setCurrent((prev) => prev + 1);
  };

  // Swipe Gesture Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        // Swipe Left → Next
        nextSlide();
      } else {
        // Swipe Right → Prev
        prevSlide();
      }
    }
  };

  return (
    <div
      className="w-full relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Link href={slides[current].link}>
        <div className="cursor-pointer">
          {/* Desktop Image */}
          <img
            src={slides[current].desktopImg}
            alt={`slide-${current}`}
            className="w-full h-auto hidden md:block rounded-2xl object-contain"
          />

          {/* Mobile Image */}
          <img
            src={slides[current].mobileImg}
            alt={`slide-mobile-${current}`}
            className="w-full h-auto md:hidden block rounded object-contain"
          />
        </div>
      </Link>

      {/* Prev Button with Smooth Transition */}
      <button
        onClick={prevSlide}
        className={`absolute top-1/2 left-3 -translate-y-1/2 hidden md:block text-primary bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 ease-in-out ${
          current > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <ArrowLeft size={20} />
      </button>

      {/* Next Button with Smooth Transition */}
      <button
        onClick={nextSlide}
        className={`absolute top-1/2 right-3 -translate-y-1/2 hidden md:block text-primary bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 ease-in-out ${
          current < slides.length - 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <ArrowRight size={20} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`md:h-2 h-0.5 rounded-full transition-all duration-300 ${
              current === idx ? 'md:w-8 w-5 bg-primary' : 'md:w-5 w-3 bg-[#d5d5d5]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
