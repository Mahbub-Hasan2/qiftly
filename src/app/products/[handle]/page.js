// src/app/products/[handle]/page.js
import ProductGallery from "@/components/productDetails/ProductGallery";
import ProductInfo from "@/components/productDetails/ProductInfo";
import YouMayAlsoLike from "@/components/productDetails/YouMayAlsoLike";
import { getAllProducts, getProductByHandle } from "@/lib/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { products } = await getAllProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export default async function ProductPage({ params }) {
  const product = await getProductByHandle(params.handle);
  if (!product) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>
      <YouMayAlsoLike />
    </div>
  );
}
