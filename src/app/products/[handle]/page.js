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

  const { products: allProducts } = await getAllProducts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-5 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 items-start">
        {/* Left side - Gallery */}
        <div className="lg:sticky top-24 self-start">
          <ProductGallery product={product} />
        </div>

        {/* Right side - Info */}
        <div className="lg:sticky top-24 self-start">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* description */}
      <div className="md:pt-10 pt-4">
        <h3 className="text-primary font-bold font-poppins mb-4 md:mt-10">Description</h3>
        <div
          className="prose prose-sm md:prose lg:prose-lg mt-0"
          dangerouslySetInnerHTML={{ __html: product?.descriptionHtml || product?.description }}
        />
      </div>

      <YouMayAlsoLike currentProduct={product} allProducts={allProducts} />
    </div>

  );
}

