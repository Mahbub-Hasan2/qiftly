// app/collections/[handle]/page.js

import { getProductsByCollection, getAllProducts } from "@/lib/data";
import ClientView from "@/components/collections/ClientView";

// server component
export default async function CollectionPage({ params }) {
  const initialProducts = await getProductsByCollection(params.handle);
  const allProducts = await getAllProducts(); // সব প্রোডাক্ট
  console.log(allProducts)
  return (
    <ClientView
      initialProducts={initialProducts || []}
      allProducts={allProducts?.products || []}
    />
  );
}
