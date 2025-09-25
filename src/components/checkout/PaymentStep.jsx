// D:\Qiftly All Work\Website\qiftly\src\components\checkout\PaymentStep.jsx
"use client";

import { useState } from "react";
import { useAddress } from "../contexts/AddressContext";
import { useCart } from "../contexts/CartContext";
import { createCheckout } from "@/lib/data"; // শুধুমাত্র checkout redirect এর জন্য (public-safe)
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function PaymentStep({ onNext }) {
  const { addresses } = useAddress();
  const { cartItems } = useCart();
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  const [paymentOption, setPaymentOption] = useState("card");
  const [billingOption, setBillingOption] = useState("same");
  const [billingData, setBillingData] = useState({ fullName: "", street: "", city: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateField = (name, value) => {
    if (!value || !String(value).trim()) return `${name[0].toUpperCase() + name.slice(1)} is required.`;
    if (name === "phone" && !/^\d{7,15}$/.test(String(value).trim())) return "Phone must be 7–15 digits.";
    if (name === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(value).trim())) return "Invalid email address.";
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

    const addressToUse = billingOption === "different" ? billingData : (addresses && addresses[0]);
    if (!addressToUse || !addressToUse.street) {
      alert("No address found. Please provide a shipping address first.");
      return;
    }

    try {
      if (paymentOption === "card") {
        // Redirect to Shopify checkout (client-safe)
        const checkout = await createCheckout(safeCartItems, addressToUse, addressToUse.email || billingData.email);
        window.location.href = checkout.webUrl;
        return;
      }

      // === COD flow: call server API which will call createDraftOrder on server-side ===
      const resp = await fetch("/api/draft-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: safeCartItems,
          address: addressToUse,
          email: addressToUse.email || billingData.email,
        }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(errText || "Draft order creation failed on server");
      }

      const data = await resp.json();
      // server returns { draftOrder: { id, name, invoiceUrl, status, ... } }
      const draftOrder = data.draftOrder || data;

      const total = safeCartItems.reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || 1)), 0);

      const orderData = {
        id: draftOrder?.id || String(Date.now()),
        orderName: draftOrder?.name || "",
        invoiceUrl: draftOrder?.invoiceUrl || "",
        status: draftOrder?.status || "OPEN",
        cartItems: safeCartItems,
        address: addressToUse,
        email: addressToUse.email || billingData.email,
        paymentMethod: "Cash on Delivery (COD)",
        total,
        createdAt: new Date().toISOString(),
      };

      // save locally so confirmation page can show without Shopify subscription
      localStorage.setItem("latestOrder", JSON.stringify(orderData));

      // redirect to confirmation page
      router.push("/Checkout/Confirmation");
    } catch (err) {
      alert("Order failed: " + (err?.message || "Unknown error"));
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto bg-white md:p-6 rounded-xl">
      <div>
        <h2 className="text-lg font-semibold">Payment</h2>
        <p className="text-sm text-gray-500">All transactions are secure and encrypted.</p>
      </div>

      <div className="space-y-3">
        <div onClick={() => setPaymentOption("card")} className={`border rounded-lg p-4 cursor-pointer flex items-start gap-4 ${paymentOption === "card" ? "border-[#787F3F] bg-[#F7F6ED]" : "border-gray-300"}`}>
          <input type="radio" name="payment" checked={paymentOption === "card"} readOnly />
          <p className="text-sm font-medium">Pay by Card / Apple Pay / Google Pay</p>
        </div>

        <div onClick={() => setPaymentOption("cod")} className={`border rounded-lg p-4 cursor-pointer flex items-start gap-4 ${paymentOption === "cod" ? "border-[#787F3F] bg-[#F7F6ED]" : "border-gray-300"}`}>
          <input type="radio" name="payment" checked={paymentOption === "cod"} readOnly />
          <p className="text-sm font-medium">Cash on Delivery (COD)</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Billing address</p>
        <div onClick={() => setBillingOption("same")} className={`border rounded-lg p-4 cursor-pointer ${billingOption === "same" ? "border-[#787F3F] bg-[#F7F6ED]" : "border-gray-300"}`}>
          <input type="radio" name="billing" checked={billingOption === "same"} readOnly /> Same as shipping address
        </div>
        <div onClick={() => setBillingOption("different")} className={`border rounded-lg p-4 cursor-pointer ${billingOption === "different" ? "border-[#787F3F] bg-[#F7F6ED]" : "border-gray-300"}`}>
          <input type="radio" name="billing" checked={billingOption === "different"} readOnly /> Use a different billing address
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
