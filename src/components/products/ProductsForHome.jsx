import { getProductsByCollection } from "@/lib/data";
import ProductSlider from "./ProductSlider";

export default async function ProductsForHome() {

    const GiftByOccasion = await getProductsByCollection("gift-by-occasion");
    const NewArrivalsAndBestSelling  = await getProductsByCollection("new-arrivals-and-best-selling");
    const WallFramesAndIslamicArt = await getProductsByCollection("wall-frames-islamic-art");
    const MugAndBoxSets = await getProductsByCollection("mug-box-sets");

    console.log(WallFramesAndIslamicArt)

    return (
        <div className="">
            <ProductSlider
                title="New Arrivals "
                subtitle="🎉 Celebrate Every Moment"
                products={NewArrivalsAndBestSelling}
                defaultCategories={["Best Sellers", "New Arrivals"]}
                initialActiveCategory="Best Sellers"
                filterKey="tags"
                showProductsCategory={false}
            />
            <ProductSlider
                title="Gift by Occasion"
                subtitle="🎉 Celebrate Every Moment"
                products={GiftByOccasion}
                defaultCategories={["Birthday", "Anniversary", "Eid"]}
                initialActiveCategory=""
                filterKey="tags"
                showProductsCategory={false}
            />
            <ProductSlider
                title="Wall Frames & Islamic Art"
                subtitle="🎁 Find the perfect gift for anyone"
                products={WallFramesAndIslamicArt}
                defaultCategories={["Quranic Verses", "Calligraphy", "Art", "Frame Sets"]}
                initialActiveCategory=""
                filterKey="tags"
                showProductsCategory={false}
            />
            <ProductSlider
                title="Mug & Box Sets"
                subtitle="✨ Choose what suits best"
                products={MugAndBoxSets}
                defaultCategories={["Coffee Mug", "Gift Box", "Mugs"]}
                initialActiveCategory=""
                filterKey="tags"
                showProductsCategory={false} // ডাইনামিক ক্যাটাগরি গুলো হাইড হয়ে যাবে
            />

        </div>
    );
}
