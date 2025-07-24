import { Eye } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product, activeCategory }) {
    const { title, id, images, priceRange } = product;
    const imageUrl = images?.edges?.[0]?.node?.url || '/placeholder.png';
    const price = priceRange?.minVariantPrice?.amount;

    return (
        <div className="font-poppins snap-start shrink-0 bg-white border-gray-300 border rounded-xl p-2 h-full shadow hover:shadow-lg transition-all relative"
        >
            {/* Badge */}
            {(() => {
                const badges = ["Best Sellers", "New Arrivals"];
                const matched = badges.find(tag => product?.tags?.includes(tag));

                const displayTag = product?.tags?.includes(activeCategory)
                    ? activeCategory
                    : matched;

                if (!displayTag) return null;

                return (
                    <div
                        className={`absolute top-3 left-3 text-white text-xs px-2 py-0.5 rounded ${displayTag === "Best Sellers" ? "bg-orange-400" : "bg-gray-600"
                            }`}
                    >
                        {displayTag === "Best Sellers" ? "Top Seller" : "New Arrival"}
                    </div>
                );
            })()}

            <Link href={`/products/${product.handle}`}>
                {/* Product Image */}
                <img
                    src={imageUrl || '/placeholder.png'}
                    alt={product.images?.[0]?.altText || product.title}
                    className="w-full h-auto object-cover rounded-lg"
                />

                {/* Price & Title */}
                <div className="mt-4">
                    <h4 className="font-bold text-gray-900">
                        QAR {price}
                    </h4>
                    <h3 className="text-sm md:font-medium mt-1 line-clamp-2 text-gray-800">{product.title}</h3>
                </div>
            </Link>

        </div>
    );
}
