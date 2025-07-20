import { Eye } from "lucide-react";

export default function ProductCard({ product }) {
    const { title,  id, images, priceRange } = product;
    const imageUrl = images?.edges?.[0]?.node?.url || '/placeholder.png';
    const price = priceRange?.minVariantPrice?.amount;

    return (
        <div className="snap-start shrink-0 bg-white border rounded-xl p-3 shadow hover:shadow-lg transition-all relative"
        >
            {/* Badge */}
            <div className="absolute top-2 left-2 bg-gray-600 text-white text-xs px-2 py-0.5 rounded">
                New Arrival
            </div>

            {/* Hover Eye */}
            <div className="absolute top-2 right-2">
                <button className="bg-white border rounded-full p-1 shadow hover:scale-105 transition">
                    <Eye className="w-4 h-4 text-gray-700" />
                </button>
            </div>

            {/* Product Image */}
            <img
                src={imageUrl || '/placeholder.png'}
                alt={product.images?.[0]?.altText || product.title}
                className="w-full h-48 object-cover rounded-lg"
            />

            {/* Price & Title */}
            <div className="mt-4">
                <p className="text-xs text-gray-500">
                    QAR {price}
                </p>
                <h3 className="text-sm font-medium mt-1 line-clamp-2">{product.title}</h3>
            </div>
        </div>
    );
}
