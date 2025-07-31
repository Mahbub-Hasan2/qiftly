"use client";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { MessageSquareMore } from "lucide-react";

export default function SpecialRequestSection() {
  const [needGiftWrap, setNeedGiftWrap] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);
  const [message, setMessage] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");

  const { addGiftWrap, removeGiftWrap, cartItems } = useCart();

  // Update needGiftWrap whenever cartItems changes
  useEffect(() => {
    const giftExists = cartItems.some((item) => item.id === "gift_wrap");
    setNeedGiftWrap(giftExists);
  }, [cartItems]);

  // When user toggles checkbox manually
  const handleGiftToggle = () => {
    if (needGiftWrap) {
      removeGiftWrap();
    } else {
      addGiftWrap();
    }
    // State will auto-update via cartItems effect above
  };

  return (
    <div className="border-t border-gray-300 pt-4">
      <h3 className="font-semibold text-gray-800 mb-5 text-xl">Special request</h3>

      {/* Gift wrap toggle */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex gap-3">
          <div className="text-2xl leading-6">🎁</div>
          <div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-800">Gift Wrap</p>
              <p className="text-red-500 font-medium text-xs">+5 QAR</p>
            </div>
            <p className="text-xs text-gray-500">Would you like the gift to be wrapped?</p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={needGiftWrap}
            onChange={handleGiftToggle}
          />
          <div className="w-10 h-6 bg-gray-300 rounded-full peer peer-checked:bg-black transition-all duration-300"></div>
          <div className="absolute left-0.6 top-0.6 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform duration-300"></div>
        </label>
      </div>

      {/* Special request textarea/preview */}
      <div className="flex items-start gap-3 mb-8">
        <div className="text-xl leading-6 pt-0.5">
          <MessageSquareMore />
        </div>
        <div className="w-full">
          <p onClick={() => setShowTextarea(true)} className="text-sm font-medium text-gray-800">Any special request?</p>
          {!submittedMessage && !showTextarea && (
            <p className="text-xs text-gray-500">Anything else we need to know ?</p>
          )}

          {showTextarea && (
            <div>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black resize-none"
              />
              <button
                onClick={() => {
                  setSubmittedMessage(message);
                  setShowTextarea(false);
                }}
                className="mt-2 px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800"
              >
                Submit
              </button>
            </div>
          )}

          {submittedMessage && !showTextarea && (
            <div className="mt-2 bg-gray-100 p-2 rounded text-sm text-gray-800">
              {submittedMessage}
              <button
                onClick={() => {
                  setShowTextarea(true);
                  setSubmittedMessage("");
                }}
                className="block mt-1 text-xs text-blue-600 underline"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
