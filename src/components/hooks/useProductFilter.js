import { useMemo, useState, useEffect } from "react";

export function useProductFilter(
  products,
  key = "productType",
  defaultCategories = [],
  showProductsCategory = true // 🆕 default is true
) {
  const categories = useMemo(() => {
    const dynamicCats = showProductsCategory
      ? products?.map((p) => p?.[key]?.trim()).filter(Boolean) || []
      : [];

    const unique = Array.from(new Set([...dynamicCats, ...defaultCategories]));
    return unique;
  }, [products, key, defaultCategories, showProductsCategory]);

  const [activeCategory, setActiveCategory] = useState(categories[0] || "");

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return products || [];
    return (products || []).filter((p) => p?.[key] === activeCategory);
  }, [products, key, activeCategory]);

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory(categories[0] || "");
    }
  }, [categories, activeCategory]);

  return {
    categories,
    activeCategory,
    setActiveCategory,
    filteredProducts,
  };
}
