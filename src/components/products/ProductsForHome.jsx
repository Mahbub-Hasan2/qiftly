import { getProductsByCollection } from "@/lib/data";
import ProductSlider from "./ProductSlider";

export default async function ProductsForHome({ products }) {

    const occasions = await getProductsByCollection("occasion");
    const recipients = await getProductsByCollection("recipients");
    const types = await getProductsByCollection("types");
    console.log(occasions, recipients, types)

    return (
        <div className="">
            <ProductSlider
                title="Gift by Occasion"
                subtitle="🎉 Celebrate Every Moment"
                products={products}
                defaultCategories={["Birthday", "Anniversary", "Eid"]}
                filterKey="productType"
                showProductsCategory={true}
            />
            <ProductSlider
                title="Gift by Person"
                subtitle="🎁 Find the perfect gift for anyone"
                products={products}
                defaultCategories={["For Him", "For Her", "For Kids"]}
                filterKey="productType"
            />
            <ProductSlider
                title="Gift by Type"
                subtitle="✨ Choose what suits best"
                products={products}
                defaultCategories={["Islamic Gifts", "Home Decor", "Mugs"]}
                filterKey="productType"
                showProductsCategory={false} // ডাইনামিক ক্যাটাগরি গুলো হাইড হয়ে যাবে
            />
            <ProductSlider
                title="Gift by Occasion"
                subtitle="🎉 Celebrate Every Moment"
                products={products}
                defaultCategories={["Birthday", "Anniversary", "Eid"]}
                filterKey="productType"
                showProductsCategory={true}
            />

        </div>
    );
}
