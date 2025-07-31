// app/collections/[handle]/page.js
import { getProductsByCollection, getAllProducts } from "@/lib/data";
import ClientView from "@/components/collections/ClientView";
import { notFound } from "next/navigation";

export default async function CollectionPage({ params }) {
  const { handle } = await params;

  if (!handle) return notFound();

  const initialProducts = await getProductsByCollection(handle);
  const allProducts = await getAllProducts();

  if (!initialProducts || initialProducts.length === 0) {
    return notFound(); // 404 দেখাবে
  }


  return (
    <ClientView
      initialProducts={initialProducts || []}
      allProducts={allProducts?.products || []}
      title={handle}
    />
  );
}
