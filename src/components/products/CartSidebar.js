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
          className="fixed inset-0 bg-black/25 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#FFFBF7] rounded-l-3xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col`}
      >


        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll">
          {/* Header */}
          <div className="flex justify-between items-center py-2 shrink-0">
            <h2 className="text-xl font-extrabold tracking-tight font-poppins">Cart</h2>
            <button onClick={onClose} className="p-3 shadow rounded-full">
              <X className="w-5 h-5 text-primary" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => {
              const price = parseFloat(item?.priceRange?.minVariantPrice?.amount || 0);
              const currency = item?.priceRange?.minVariantPrice?.currencyCode || "QAR";
              const title = item?.title || "No title";
              const image = item?.images?.edges?.[0]?.node?.url || "/placeholder.jpg";

              return (
                <div key={index} className="flex items-start gap-4 shadow-md rounded-lg bg-white p-3">
                  <div>
                    <img
                      src={image}
                      alt={title}
                      className="w-25 h-25 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 font-poppins">
                    <div className="flex">
                      <div className="">
                        <h4 className="text-sm  text-gray-700 line-clamp-2">{title}</h4>

                        <p className="text-md font-medium text-gray-900 mt-1">
                          {currency} {price.toFixed(2)}
                        </p>
                      </div>

                      <div className="ml-auto ">
                        <button
                          onClick={() => removeItem(item.id)}
                          className=""
                          title="Remove"
                        >
                          <Trash2 size={40} className="cursor-pointer p-3 bg-gray-50 text-md text-xl text-primary rounded-full" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end items-end">
                      <div className=" flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, "dec")}
                          className="cursor-pointer w-9 h-9 bg-gray-50 text-md text-xl rounded-full"
                        >
                          −
                        </button>
                        <span className="px-2 text-sm font-medium text-gray-950">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, "inc")}
                          className="cursor-pointer w-9 h-9 bg-gray-50 text-md text-xl rounded-full"
                        >
                          +
                        </button>

                      </div>
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

          {/* Footer */}
          <div className="md:mb-0 mb-14 p-4  shrink-0">
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
    </div>
  );
}
