"use client";

import { useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useRouter } from "next/navigation";
import { useUI } from "../contexts/UIContext";
import SpecialRequestSection from "./SpecialRequestSection";

export default function CartSidebar({ isOpen, onClose }) {
  const router = useRouter();

  const { cartItems, updateQuantity, removeItem, totalPrice } = useCart();
  const { setIsCartOpen } = useUI();

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

          {/* Special request */}
          <SpecialRequestSection />

          {/* Footer */}

          <div className="md:pt-4 pt-2"> {/*এই পার্টকে আমি স্টিকি করতে চাই বটমে , যদি প্রডাক্ট বেশি হয় তাহলে সি্িটকি চলে যাবে , যেনো নিচের দিকে চলে যায়। */}
            <h2 className="font-semibold md:text-lg text-2xl mb-4">Payment summary</h2>

            {/* Subtotal */}
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-800">QR {typeof totalPrice === "number" ? totalPrice.toFixed(2) : "0.00"}</span>
            </div>

            {/* Delivery (with welcome gift) */}
            <div className="flex justify-between text-sm items-center mb-3">
              <div className="flex items-center gap-2 text-gray-600">
                <span>Free delivery</span>
                <span className="bg-yellow-200 text-black text-xs px-2 py-0.5 rounded font-medium">Welcome gift</span>
                <span className="text-gray-400 text-xs cursor-pointer">ⓘ</span>
              </div>
              <span className="line-through text-gray-400 text-sm">QR 10.00</span>
            </div>
            
            {/* Total */}
            <div className="flex justify-between font-semibold text-base mb-4">
              <span>Total amount</span>
              <span className="text-black">QR {typeof totalPrice === "number" ? totalPrice.toFixed(2) : "0.00"}</span>
            </div>
            <hr className="my-3 border-gray-200 md:mb-2 mb-15" />



            {/* Buttons */}
            <div className="sm:static fixed bottom-0 left-0 w-full bg-[#FFFBF7] md:px-0 px-4 py-3 border-t border-gray-300 sm:border-none z-50"> {/*এই ডিব টি আমি বটম এ ফিক্সড করে রাখতে চাই  শুধু মাত্র মোবাইলে। */}
              <div className="flex gap-3">
                <button className="flex-1 cursor-pointer font-medium font-poppins border border-black text-black md:py-2 py-4 rounded-full text-sm hover:bg-gray-100 transition">
                  Add items
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push("/Checkout");
                  }}
                  className="flex-1 cursor-pointer font-medium font-poppins bg-primary text-white md:py-2 py-4 rounded-full text-sm hover:bg-orange-600 transition">
                  Checkout
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
