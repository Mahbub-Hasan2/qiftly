"use client";

import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function PaymentBillingSection({
  billingOption,
  setBillingOption,
  billingData,
  setBillingData,
  paymentMethod,
  setPaymentMethod,
  errors,
  handleBillingChange,
  fieldRefs,
}) {
  return (
    <div className="space-y-6 text-sm">
      {/* Payment Option */}
      <div className="border border-gray-200 rounded-xl p-4 space-y-2">
        <h2 className="text-base font-semibold">Payment</h2>

        <label className="flex items-start gap-2">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          <div>
            <p className="font-normal">
              Pay by Card / Apple Pay / Google Pay / NAPS
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <img className="h-6" src="/icons/visa.svg" alt="Visa" />
              <img className="h-6" src="/icons/mastercard.svg" alt="Mastercard" />
              <img className="h-6" src="/icons/apple-pay.svg" alt="Apple Pay" />
            </div>
          </div>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          <span>Cash on Delivery (COD)</span>
        </label>
      </div>

      {/* Billing Address */}
      <div className="border border-gray-200 rounded-xl p-4 space-y-2">
        <h2 className="text-base font-semibold">Billing address</h2>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="billing"
            value="same"
            checked={billingOption === "same"}
            onChange={() => setBillingOption("same")}
          />
          <span>Same as shipping address</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="billing"
            value="different"
            checked={billingOption === "different"}
            onChange={() => setBillingOption("different")}
          />
          <span>Use a different billing address</span>
        </label>

        {billingOption === "different" && (
          <div className="mt-4 space-y-3">
            <Select
              value={billingData.country}
              onValueChange={(val) =>
                setBillingData((prev) => ({ ...prev, country: val }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                <SelectItem value="Qatar">Qatar</SelectItem>
                <SelectItem value="UAE">UAE</SelectItem>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                ref={fieldRefs.billingFirstName}
                placeholder="First name"
                name="firstName"
                value={billingData.firstName || ""}
                onChange={handleBillingChange}
                error={errors.billingFirstName}
              />
              <Input
                ref={fieldRefs.billingLastName}
                placeholder="Last name"
                name="lastName"
                value={billingData.lastName || ""}
                onChange={handleBillingChange}
                error={errors.billingLastName}
              />
            </div>
            <Input
              ref={fieldRefs.billingAddress}
              placeholder="Address"
              name="address"
              value={billingData.address || ""}
              onChange={handleBillingChange}
              error={errors.billingAddress}
            />
            <Input
              placeholder="Apartment, suite, etc."
              name="apartment"
              value={billingData.apartment || ""}
              onChange={handleBillingChange}
            />
            <Input
              placeholder="City"
              name="city"
              value={billingData.city || ""}
              onChange={handleBillingChange}
            />
            <Input
              ref={fieldRefs.billingPhone}
              placeholder="Phone"
              name="phone"
              value={billingData.phone || ""}
              onChange={handleBillingChange}
              error={errors.billingPhone}
            />
          </div>
        )}
      </div>
    </div>
  );
}
