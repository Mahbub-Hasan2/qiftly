"use client";

import { useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeItem } = useCart();

  // ✅ Lock background scroll but allow sidebar scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item?.priceRange?.minVariantPrice?.amount || 0);
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="relative">
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b shrink-0">
          <h2 className="text-xl font-semibold tracking-tight">Your Cart</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scroll">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => {
              const price = parseFloat(item?.priceRange?.minVariantPrice?.amount || 0);
              const currency = item?.priceRange?.minVariantPrice?.currencyCode || "QAR";
              const title = item?.title || "No title";
              const image = item?.images?.edges?.[0]?.node?.url || "/placeholder.jpg";

              return (
                <div key={index} className="flex items-start gap-4 border-b pb-4">
                  <img
                    src={image}
                    alt={title}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 line-clamp-2">{title}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {currency} {price.toFixed(2)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, "dec")}
                        className="w-7 h-7 border rounded hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, "inc")}
                        className="w-7 h-7 border rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-red-500 hover:text-red-700"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Delivery Options */}
          <div className="pt-2">
            <h3 className="font-semibold text-gray-800 mb-2 text-sm">Delivery Schedule</h3>
            <div className="flex gap-2 mb-2">
              <select className="w-1/2 border p-2 rounded text-sm">
                <option>Select City</option>
                <option>Doha</option>
                <option>Al Rayyan</option>
              </select>
              <input type="date" className="w-1/2 border p-2 rounded text-sm" />
            </div>
            <select className="w-full border p-2 rounded text-sm mb-2">
              <option>Delivery Type & Time</option>
              <option>Morning (9am - 12pm)</option>
              <option>Evening (4pm - 8pm)</option>
            </select>
            <textarea
              rows={2}
              placeholder="Message for recipient"
              className="w-full border p-2 rounded text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white shrink-0">
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>QAR {total.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Shipping, tax & discounts calculated at checkout.
          </p>
          <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
