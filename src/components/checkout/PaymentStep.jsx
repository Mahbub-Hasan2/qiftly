"use client";

import { useState, useRef } from "react";
import { useAddress } from "../contexts/AddressContext";
import { Input } from "@/components/ui/input";

export default function PaymentStep({onNext}) {
  const { addAddress } = useAddress();

  const [paymentOption, setPaymentOption] = useState("card");
  const [billingOption, setBillingOption] = useState("same");
  const [showAllCards, setShowAllCards] = useState(false);

  const [billingData, setBillingData] = useState({
    fullName: "",
    street: "",
    city: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  // Refs for scrolling
  const billingRefs = {
    fullName: useRef(null),
    street: useRef(null),
    city: useRef(null),
    phone: useRef(null),
  };

  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = `${name[0].toUpperCase() + name.slice(1)} is required.`;
    } else if (name === "phone" && !/^\d{7,15}$/.test(value.trim())) {
      error = "Phone must be a valid number (7–15 digits).";
    }
    return error;
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;

    setBillingData((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const validateAll = () => {
    const newErrors = {};
    let firstInvalid = null;

    Object.entries(billingData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
        if (!firstInvalid) {
          firstInvalid = name;
        }
      }
    });

    setErrors(newErrors);

    // Scroll to first invalid input
    if (firstInvalid && billingRefs[firstInvalid]?.current) {
      billingRefs[firstInvalid].current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      billingRefs[firstInvalid].current.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (billingOption === "different" && !validateAll()) {
      return;
    }

    const payload = {
      paymentOption,
      billingOption,
      ...(billingOption === "different" ? { billingAddress: billingData } : {}),
    };

    console.log("📦 Final Checkout Data:", payload);
    // submit to backend or go to next step
    onNext(); // its for Stepper
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto bg-white md:p-6 rounded-xl">
      <div>
        <h2 className="text-lg font-semibold">Payment</h2>
        <p className="text-sm text-gray-500">All transactions are secure and encrypted.</p>
      </div>

      {/* Payment Options */}
      <div className="space-y-3">
        {/* Card payment */}
        <div
          onClick={() => setPaymentOption("card")}
          className={`border rounded-lg p-4 cursor-pointer flex items-start gap-4 ${
            paymentOption === "card" ? "border-[#787F3F] bg-[#F7F6ED]" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={paymentOption === "card"}
            onChange={() => setPaymentOption("card")}
            className="mt-1"
          />
          <div className="flex-1 space-y-2">
            <p className="text-sm font-medium text-[#3C3C3C]">
              Pay by Debit/ Credit Card/ Apple Pay/ Google Pay/ NAPS
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <img src="/icons/visa.svg" className="h-5" alt="Visa" />
              <img src="/icons/mastercard.svg" className="h-5" alt="Mastercard" />
              {!showAllCards ? (
                <span
                  className="text-xs bg-gray-200 px-2 py-0.5 rounded cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllCards(true);
                  }}
                >
                  +9
                </span>
              ) : (
                <>
                  <img src="/icons/knet.svg" className="h-5" alt="KNET" />
                  <img src="/icons/applepay.svg" className="h-5" alt="Apple Pay" />
                  <img src="/icons/googlepay.svg" className="h-5" alt="Google Pay" />
                </>
              )}
            </div>
            <div className="bg-gray-100 rounded-md p-4 flex items-center justify-center">
              <svg width="40" height="30" fill="none" stroke="gray">
                <rect width="36" height="24" x="2" y="3" rx="3" ry="3" strokeWidth="2" />
                <path d="M10 15h12" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="ml-3 text-sm text-gray-600">
                After clicking “Pay now”, you will be redirected to the payment gateway.
              </p>
            </div>
          </div>
        </div>

        {/* COD */}
        <div
          onClick={() => setPaymentOption("cod")}
          className={`border rounded-lg p-4 cursor-pointer flex items-start gap-4 ${
            paymentOption === "cod" ? "border-[#787F3F] bg-[#F7F6ED]" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={paymentOption === "cod"}
            onChange={() => setPaymentOption("cod")}
            className="mt-1"
          />
          <p className="text-sm font-medium">Cash on Delivery (COD)</p>
        </div>
      </div>

      {/* Billing Address */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-[#3C3C3C]">Billing address</p>

        {/* Same as shipping */}
        <div
          onClick={() => setBillingOption("same")}
          className={`border rounded-lg p-4 cursor-pointer flex items-start gap-4 ${
            billingOption === "same" ? "border-[#787F3F] bg-[#F7F6ED]" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="billing"
            checked={billingOption === "same"}
            onChange={() => setBillingOption("same")}
            className="mt-1"
          />
          <p className="text-sm font-medium">Same as shipping address</p>
        </div>

        {/* Different billing address */}
        <div
          onClick={() => setBillingOption("different")}
          className={`border rounded-lg p-4 cursor-pointer flex items-start gap-4 ${
            billingOption === "different" ? "border-[#787F3F] bg-[#F7F6ED]" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="billing"
            checked={billingOption === "different"}
            onChange={() => setBillingOption("different")}
            className="mt-1"
          />
          <p className="text-sm font-medium">Use a different billing address</p>
        </div>

        {/* Billing Form */}
        {billingOption === "different" && (
          <div className="mt-4 space-y-4 border border-gray-200 p-4 rounded-lg bg-gray-50">
            {["fullName", "street", "city", "phone"].map((field) => (
              <div key={field}>
                <Input
                  name={field}
                  type={field === "phone" ? "tel" : "text"}
                  value={billingData[field]}
                  onChange={handleBillingChange}
                  ref={billingRefs[field]}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  label={field[0].toUpperCase() + field.slice(1)}
                />
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pay Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#787F3F] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#5f6b30] transition"
      >
        Pay now
      </button>
    </div>
  );
}
