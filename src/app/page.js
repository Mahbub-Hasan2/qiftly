import DataLoader from "@/components/common/DataLoader";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import CategorySection from "@/components/Home/CategorySection";
import GiftFinderWizard from "@/components/Home/GiftFinderWizard";
import HeroSlider from "@/components/Home/HeroSlider";
import OccasionBasedGifting from "@/components/Home/OccasionBasedGifting";
import RoomWiseDecor from "@/components/Home/RoomWiseDecor";
import ProductsForHome from "@/components/products/ProductsForHome";
import { getAllCollections, getAllProducts, getHeroSlides, getProductsByCollection } from "@/lib/data";


export default async function Home() {
  const { products, error: productsError } = await getAllProducts();
  const { slides, error: slidesError } = await getHeroSlides();

  // const collections = await getAllCollections();
  // const productsByCollection = await getProductsByCollection("cakes");

  return (
    <ErrorBoundary>
      <main className="md:p-4 p-1 flex items-center justify-center">
        <div className="w-full max-w-7xl">
          <DataLoader data={slides} error={slidesError}>
            {(slidesData) => <HeroSlider slides={slidesData} />}
          </DataLoader>
          {/* <OccasionBasedGifting /> */}
          {/* <RoomWiseDecor /> */}
          <CategorySection />
          <GiftFinderWizard />
          <DataLoader data={products} error={productsError}>
            {(productsData) => <ProductsForHome products={productsData} />}
          </DataLoader>
        </div>
      </main>
    </ErrorBoundary >
  );
}
