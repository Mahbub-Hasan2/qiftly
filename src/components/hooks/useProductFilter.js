// hooks/useProductFilter.js

import { useMemo, useEffect, useState } from "react";

export function useProductFilter(products = [], key = "productType") {
  const categories = useMemo(() => {
    const unique = new Set(products.map(p => p[key]?.trim()).filter(Boolean));
    return [...unique];
  }, [products, key]);

  const [activeCategory, setActiveCategory] = useState(categories[0] || "");

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return products;
    return products.filter(p => p[key] === activeCategory);
  }, [products, activeCategory, key]);

  useEffect(() => {
    if (categories.length && !categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  return {
    categories,
    activeCategory,
    setActiveCategory,
    filteredProducts,
  };
}
