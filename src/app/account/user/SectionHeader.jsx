import React, { Children } from "react";
import { MoveLeft } from "lucide-react";

export default function SectionHeader({children}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <MoveLeft
        className="text-primary md:hidden cursor-pointer"
        onClick={() => (window.location.hash = "")}
      />
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary md:text-black">
       {children}
      </h2>
    </div>
  );
}
