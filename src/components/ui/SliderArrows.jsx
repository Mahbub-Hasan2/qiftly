// ui/SliderArrows.jsx

import { ArrowLeft, ArrowRight } from "lucide-react";

export function SliderArrows({ showLeft, showRight, onScroll }) {
  return (
    <>
      {showLeft && (
        <button
          onClick={() => onScroll("left")}
          className="absolute left-0 md:top-1/2 top-[65%] cursor-pointer border-primary text-primary border z-10 -translate-y-1/2 bg-white p-2 shadow-md rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

      {showRight && (
        <button
          onClick={() => onScroll("right")}
          className="absolute right-0 md:top-1/2 top-[65%] cursor-pointer border-primary text-primary border z-10 -translate-y-1/2 bg-white p-2 shadow-md rounded-full"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
