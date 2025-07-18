import CategorySection from "@/components/Home/CategorySection";
import GiftFinderWizard from "@/components/Home/GiftFinderWizard";
import HeroSlider from "@/components/Home/HeroSlider";
import OccasionBasedGifting from "@/components/Home/OccasionBasedGifting";
import RoomWiseDecor from "@/components/Home/RoomWiseDecor";
import PerfectProductSlider from "@/components/products/PerfectProductSlider";
import { getAllCollections, getAllProducts, getHeroSlides, getProductsByCollection } from "@/lib/data";


export default async function Home() {
  const products = await getAllProducts();
  const slides = await getHeroSlides();
  
const collections = await getAllCollections();
const productsByCollection = await getProductsByCollection("cakes");

  return (
    <main className="md:p-4 p-1 flex items-center justify-center">
      <div className="w-full max-w-7xl">
        <HeroSlider slides={slides} />
        {/* <OccasionBasedGifting /> */}
        {/* <RoomWiseDecor /> */}
        <CategorySection />
        <GiftFinderWizard />
        <PerfectProductSlider products={products} />
      </div>
    </main>
  );
}
