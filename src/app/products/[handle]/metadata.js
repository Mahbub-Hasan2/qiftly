// src/app/products/[handle]/metadata.js
import { getProductByHandle } from "@/lib/data";

export async function generateMetadata({ params }) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    return {
      title: "Product Not Found | Qiftly",
      description: "Sorry, this product does not exist.",
    };
  }

  return {
    title: `${product.title} | Qiftly`,
    description: product.description?.slice(0, 150) || "Premium gift & home decor.",
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.images?.edges?.[0]?.node?.url || "/default.jpg"],
    },
  };
}
