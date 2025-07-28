"use client";

import { useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import Link from "next/link";

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeItem, totalPrice } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/25 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#FFFBF7] md:rounded-l-3xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col`}
      >
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 custom-scroll">
          {/* Header */}
          <div className="flex justify-between items-center py-2 md:mb-2 mb-0">
            <h2 className="text-2xl font-extrabold tracking-tight font-poppins">Cart</h2>
            <button onClick={onClose} className="cursor-pointer p-3 shadow rounded-full bg-white">
              <X className="w-5 h-5 text-primary " />
            </button>
          </div>

          {/* Cart Items - Mobile */}
          <div className="block sm:hidden">
            <div className="max-h-[500px] overflow-y-auto space-y-3">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
              ) : (
                cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 shadow-md rounded-lg bg-white p-3"
                  >
                    <div className="w-24 h-24">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 font-poppins">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-sm text-gray-700 line-clamp-2">{item.title}</h4>
                          <p className="text-md font-medium text-gray-900 mt-1">
                            {item.currency}{" "}
                            {typeof item.price === "number" ? item.price.toFixed(2) : "0.00"}
                          </p>
                        </div>
                        <button onClick={() => removeItem(item.id)} title="Remove">
                          <Trash2
                            size={40}
                            className="cursor-pointer p-3 mb-5 bg-gray-50 text-primary rounded-full"
                          />
                        </button>
                      </div>

                      <div className="flex justify-end items-end">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, "dec")}
                            className="w-9 h-9 bg-gray-50 rounded-full text-xl"
                          >
                            −
                          </button>
                          <span className="px-2 text-sm font-medium text-gray-950">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, "inc")}
                            className="w-9 h-9 bg-gray-50 rounded-full text-xl"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cart Items - Desktop */}
          <div className="hidden sm:block space-y-3">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 shadow-md rounded-lg bg-white p-3"
                >
                  <div className="w-24 h-24">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 font-poppins">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-sm text-gray-700 line-clamp-2">{item.title}</h4>
                        <p className="text-md font-medium text-gray-900 mt-1">
                          {item.currency}{" "}
                          {typeof item.price === "number" ? item.price.toFixed(2) : "0.00"}
                        </p>
                      </div>
                      <button onClick={() => removeItem(item.id)} title="Remove">
                        <Trash2
                          size={40}
                          className="cursor-pointer p-3 mb-5 bg-gray-50 text-primary rounded-full"
                        />
                      </button>
                    </div>

                    <div className="flex justify-end items-end">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, "dec")}
                          className="cursor-pointer w-9 h-9 bg-gray-50 rounded-full text-xl"
                        >
                          −
                        </button>
                        <span className="px-2 text-sm font-medium text-gray-950">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, "inc")}
                          className="cursor-pointer w-9 h-9 bg-gray-50 rounded-full text-xl"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Delivery Info */}
          <div className="pt-2 border-t border-gray-300 ">
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
          <div className="md:mb-0 p-4">
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>QAR {typeof totalPrice === "number" ? totalPrice.toFixed(2) : "0.00"}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Shipping, tax & discounts calculated at checkout.
            </p>
            <Link href="/Checkout">
              <button className="cursor-pointer mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                Proceed to Checkout
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
