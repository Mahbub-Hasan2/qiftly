// components/PaymentBillingSection.jsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PaymentBillingSection() {
    const [billingOption, setBillingOption] = useState("same");

    return (
        <div className="space-y-6 text-sm">
            {/* Payment Method */}
            <div className="space-y-2 border border-gray-200 rounded-xl p-4">
                <h2 className="text-base font-semibold">Payment</h2>

                <div className="space-y-2">
                    <label className="flex items-start gap-2">
                        <input type="radio" name="payment" defaultChecked />
                        <div className="space-y-1 ">
                            <div className="flex gap-4">
                                <p className="font-normal">Pay by Debit/ Credit Card/ Apple Pay/ Google Pay/ NAPS</p>
                                <div className="flex flex-wrap items-center gap-2">
                                    <img className="h-8 md:h-8" src="https://cdn.shopify.com/s/files/1/0766/6365/2609/files/mastercard_95b29551-18c2-48dc-99b8-2fca8a8f96a3.avif?v=1753425634" alt="Mastercard" />
                                    <img className="h-8 md:h-8" src="https://cdn.shopify.com/s/files/1/0766/6365/2609/files/visa_5badd0b9-dbaf-4a2d-a7b0-eb88cb755c3d.avif?v=1753425634" alt="Visa" />
                                    <img className="h-8 md:h-8" src="https://cdn.shopify.com/s/files/1/0766/6365/2609/files/apple-pay_ca03f924-a38d-40f6-8d1b-77cb18f97daf.webp?v=1753425634" alt="Apple Pay" />
                                    <img className="h-8 md:h-8" src="https://cdn.shopify.com/s/files/1/0766/6365/2609/files/naps_41c4c8ba-377a-4ea9-b9f2-eaceb40c4d3e.webp?v=1753425634" alt="NAPS" />
                                    <img className="h-8 md:h-8" src="https://cdn.shopify.com/s/files/1/0766/6365/2609/files/gpay_c6643f18-fc38-4ed1-964e-abb6e8420b3f.avif?v=1753425634" alt="GPay" />
                                    <img className="h-8 md:h-8" src="https://cdn.shopify.com/s/files/1/0766/6365/2609/files/amex.avif?v=1753425633" alt="AMEX" />
                                    {/* <img className="h-8 md:h-8" src="https://cdn.shopify.com/s/files/1/0766/6365/2609/files/COD_Icon_34c5679d-9814-49a7-af5e-2c5680f57642.avif?v=1753425634" alt="Cash on Delivery" /> */}
                                </div>
                            </div>
                            <p className="text-gray-600">
                                After clicking “Pay now”, you will be redirected to complete your purchase securely.
                            </p>
                        </div>
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="radio" name="payment" />
                        <span>Cash on Delivery (COD)</span>
                    </label>
                </div>
            </div>

            {/* Billing Address */}
            <div className="space-y-2 border border-gray-200 rounded-xl p-4">
                <h2 className="text-base font-semibold">Billing address</h2>

                <div className="space-y-2">
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
                </div>

                {billingOption === "different" && (
                    <div className="mt-4 space-y-3">
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Country/Region" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="qatar">Qatar</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input placeholder="First name" />
                            <Input placeholder="Last name" />
                        </div>
                        <Input placeholder="Address" />
                        <Input placeholder="Apartment, suite, etc. (optional)" />
                        <Input placeholder="City" />
                        <Input placeholder="Phone (optional)" />
                    </div>
                )}
            </div>

            <Button className="w-full bg-[#a4a044] text-white text-sm py-2 rounded-md">Pay now</Button>
        </div>
    );
}
