"use client";

import { useState } from "react";
import { useAddress } from "../contexts/AddressContext";
import { useCart } from "../contexts/CartContext";
import { createCheckout, createDraftOrder } from "@/lib/data";
import { Input } from "@/components/ui/input";

export default function PaymentStep({ onNext }) {
  const { addresses } = useAddress();
  const { cartItems } = useCart();
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  const [paymentOption, setPaymentOption] = useState("card");
  const [billingOption, setBillingOption] = useState("same");
  const [billingData, setBillingData] = useState({ fullName: "", street: "", city: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (!value.trim()) return `${name[0].toUpperCase() + name.slice(1)} is required.`;
    if (name === "phone" && !/^\d{7,15}$/.test(value.trim())) return "Phone must be 7–15 digits.";
    if (name === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim())) return "Invalid email address.";
    return "";
  };

  const validateAll = () => {
    const newErrors = {};
    Object.entries(billingData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async () => {
    if (billingOption === "different" && !validateAll()) return;

    const addressToUse = billingOption === "different" ? billingData : addresses[0];
    if (!addressToUse || !addressToUse.street) {
      alert("No address found. Please provide a shipping address first.");
      return;
    }

    try {
      if (paymentOption === "card") {
        // পুরানো checkout API (Stripe/Card এর জন্য)
        const checkout = await createCheckout(safeCartItems, addressToUse, addressToUse.email || billingData.email);
        window.location.href = checkout.webUrl;
      } else {
        // নতুন Draft Order API for COD
        const response = await fetch("/api/draft-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItems: safeCartItems,
            address: addressToUse,
            email: addressToUse.email || billingData.email,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Draft order creation failed");
        }

        const draftOrder = await response.json();

        if (draftOrder?.draftOrder) {
          alert(`Order placed! Invoice: ${draftOrder.draftOrder.invoiceUrl}`);
          onNext();
        } else {
          throw new Error("Draft order creation failed");
        }
      }
    } catch (err) {
      alert("Order failed: " + (err?.message || "Unknown error"));
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto bg-white md:p-6 rounded-xl">
      {/* Payment options */}
      <div>
        <h2 className="text-lg font-semibold">Payment</h2>
        <p className="text-sm text-gray-500">All transactions are secure and encrypted.</p>
      </div>

      <div className="space-y-3">
        {/* Card */}
        <div onClick={() => setPaymentOption("card")} className={`border rounded-lg p-4 cursor-pointer flex items-start gap-4 ${paymentOption === "card" ? "border-[#787F3F] bg-[#F7F6ED]" : "border-gray-300"}`}>
          <input type="radio" name="payment" checked={paymentOption === "card"} onChange={() => setPaymentOption("card")} />
          <p className="text-sm font-medium">Pay by Card / Apple Pay / Google Pay</p>
        </div>

        {/* COD */}
        <div onClick={() => setPaymentOption("cod")} className={`border rounded-lg p-4 cursor-pointer flex items-start gap-4 ${paymentOption === "cod" ? "border-[#787F3F] bg-[#F7F6ED]" : "border-gray-300"}`}>
          <input type="radio" name="payment" checked={paymentOption === "cod"} onChange={() => setPaymentOption("cod")} />
          <p className="text-sm font-medium">Cash on Delivery (COD)</p>
        </div>
      </div>

      {/* Billing address */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Billing address</p>
        <div onClick={() => setBillingOption("same")} className={`border rounded-lg p-4 cursor-pointer ${billingOption === "same" ? "border-[#787F3F] bg-[#F7F6ED]" : "border-gray-300"}`}>
          <input type="radio" name="billing" checked={billingOption === "same"} onChange={() => setBillingOption("same")} /> Same as shipping address
        </div>
        <div onClick={() => setBillingOption("different")} className={`border rounded-lg p-4 cursor-pointer ${billingOption === "different" ? "border-[#787F3F] bg-[#F7F6ED]" : "border-gray-300"}`}>
          <input type="radio" name="billing" checked={billingOption === "different"} onChange={() => setBillingOption("different")} /> Use a different billing address
        </div>

        {billingOption === "different" && (
          <div className="mt-4 space-y-4 border border-gray-200 p-4 rounded-lg bg-gray-50">
            {["fullName", "street", "city", "phone", "email"].map(field => (
              <div key={field}>
                <Input name={field} value={billingData[field]} onChange={handleBillingChange} placeholder={field} />
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={handleSubmit} className="w-full bg-[#787F3F] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#5f6b30] transition">
        {paymentOption === "card" ? "Pay now" : "Confirm Order"}
      </button>
    </div>
  );
}
