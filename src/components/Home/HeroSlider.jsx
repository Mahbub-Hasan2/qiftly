'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useUI } from '../contexts/UIContext';


export default function HeroSlider({ slides }) {
  const { isCartOpen } = useUI();

  const [current, setCurrent] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [current]);

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const nextSlide = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(0); // loop to first slide if needed
    }
  };

  // Touch Events
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    setTranslate(diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (translate < -50) {
      nextSlide();
    } else if (translate > 50) {
      prevSlide();
    }
    setTranslate(0);
  };

  return (
    <div className="w-full ">
      <div className="w-full relative overflow-hidden touch-pan-x">
        <div
          className={`flex transition-transform duration-500 ease-in-out`}
          style={{
            transform: `translateX(calc(${-current * 100}% + ${translate}px))`
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, idx) => (
            <Link href={"/collections/" + slide.link.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')} key={idx} className="min-w-full">
              <div className="cursor-pointer select-none">
                <img
                  src={slide.desktopImg}
                  alt={`slide-${idx}`}
                  className="w-full h-auto hidden md:block object-contain rounded-2xl"
                />
                <img
                  src={slide.mobileImg}
                  alt={`slide-mobile-${idx}`}
                  className="w-full h-auto md:hidden block object-contain rounded"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className={`absolute top-1/2 left-3 -translate-y-1/2 hidden md:block text-primary bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 ease-in-out ${current > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}
        >
          <ArrowLeft size={20} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className={`absolute top-1/2 right-3 -translate-y-1/2 hidden md:block text-primary bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 ease-in-out ${current < slides.length - 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}
        >
          <ArrowRight size={20} />
        </button>

        {/* Pagination Dots */}

      </div>

      {
        isCartOpen ? 
         "" : <div className="relative">
          <div className="absolute  md:p-4 p-1.5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`md:h-2 h-0.5 rounded-full transition-all duration-300 ${current === idx ? 'md:w-8 w-5 bg-primary' : 'md:w-5 w-3 bg-[#d5d5d5]'
                  }`}
              />
            ))}
          </div>
        </div>
      }


    </div>
  );
}
