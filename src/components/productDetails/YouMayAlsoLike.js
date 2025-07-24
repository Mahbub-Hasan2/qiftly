"use client";
import ProductCard from "../cards/ProductCard";
import { useProductFilter } from "../hooks/useProductFilter";

export default function YouMayAlsoLike({ currentProduct, allProducts }) {
  const currentTags = currentProduct?.tags || [];

  // একই প্রোডাক্ট যেন না আসে
  const otherProducts = allProducts.filter(
    (p) => p.handle !== currentProduct.handle
  );

  const { filteredProducts } = useProductFilter(
    otherProducts,
    "tags",
    currentTags,
    false,
    currentTags[0] || ""
  );

  if (filteredProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
