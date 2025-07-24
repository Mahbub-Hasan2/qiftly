// components/ProductInfo.js

export default function ProductInfo({ product }) {
  const { title, price, descriptionItems } = product;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <p className="text-xl font-bold text-green-700">QAR {price}</p>
      </div>

      <button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6">
        Add to Cart
      </button>

      <div className="flex gap-4 text-sm text-gray-500">
        <span>🚚 30 Minutes Delivery</span>
        <span>💵 Cash On Delivery</span>
        <span>📦 No Address, No Worries</span>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Product Details</h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          {descriptionItems?.map((item, idx) => <li key={idx}>{item}</li>) || (
            <>
              <li>Single Origin Coffee Roasters</li>
              <li>Godiva Chocolate Box</li>
              <li>Castania Cashews</li>
              <li>Relax & Renew Card</li>
              <li>Beautifully Crafted Basket</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
