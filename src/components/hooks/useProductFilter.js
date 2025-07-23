import { useMemo, useState, useEffect } from "react";

export function useProductFilter(
  products,
  key = "tags", // এখানে আমরা 'tags' ইউজ করব
  defaultCategories = [],
  showProductsCategory = true,
  initialActiveCategory = ""
) {
  const categories = useMemo(() => {
    const dynamicCats = showProductsCategory
      ? products.flatMap((p) => p?.tags || []) // multiple tags
      : [];

    const unique = Array.from(new Set([...dynamicCats, ...defaultCategories]));
    return unique;
  }, [products, defaultCategories, showProductsCategory]);

  const [activeCategory, setActiveCategory] = useState(initialActiveCategory);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return products || [];

    return (products || []).filter((p) =>
      p?.tags?.includes(activeCategory)
    );
  }, [products, activeCategory]);

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory("");
    }
  }, [categories, activeCategory]);

  return {
    categories,
    activeCategory,
    setActiveCategory,
    filteredProducts,
  };
}
