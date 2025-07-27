"use client";

import React, { useState } from "react";
import { Grid3X3, LayoutList, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/cards/ProductCard";

export default function collections() {
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");

  const products = new Array(32).fill({}); // Demo, replace with real data
  const totalProducts = 618;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        Home <span className="mx-2">›</span> <span className="text-gray-700 font-medium">Anniversary Gifts for Wife</span>
      </div>

      {/* Title + Count */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Anniversary Gifts for Wife</h1>
        <span className="text-sm text-gray-500">Products: {products.length}/{totalProducts}</span>
      </div>

      {/* Filter + Sort + View Toggle */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Button variant="outline" className="bg-[#616025] text-white px-4 py-2 rounded-full">
          Filter
        </Button>

        <div className="flex items-center gap-4 ml-auto">
          {/* Sort Dropdown */}
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

          {/* View Toggle Icons */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-md ${view === "list" ? "bg-[#616025] text-white" : "bg-muted"}`}
              onClick={() => setView("list")}
            >
              <LayoutList className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-md ${view === "grid" ? "bg-[#616025] text-white" : "bg-muted"}`}
              onClick={() => setView("grid")}
            >
              <LayoutGrid className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div
        className={`grid gap-4 ${
          view === "grid" ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "grid-cols-1"
        }`}
      >
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
}
