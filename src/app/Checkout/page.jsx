"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentBillingSection from "@/components/Payment/PaymentBillingSection";

export default function CheckoutPage() {
    const [sameBilling, setSameBilling] = useState(true);

    return (
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-5 gap-6 p-4 max-w-screen-lg mx-auto">
            {/* Sender + Delivery + Payment Section */}
            <div className="lg:col-span-3 space-y-6">
                {/* Sender Details */}
                <div className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Sender Details</h2>
                    <Input placeholder="Email" type="email" />
                    <div className="flex items-center gap-1">
                        <Checkbox id="news" />
                        <label htmlFor="news" className="text-sm">Email me with news and offers</label>

                    </div>
                    <div className="flex items-center gap-1">
                        <Checkbox id="identity" />
                        <label htmlFor="identity" className="text-sm">Keep my identity secret</label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input placeholder="Enter Name" />
                        <Input placeholder="Phone Number" defaultValue="+974" />
                    </div>
                </div>

                {/* Delivery Details */}
                <Card className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Delivery</h2>
                    <div className="flex items-center gap-2">
                        <Checkbox id="call-recipient" />
                        <label htmlFor="call-recipient" className="text-sm">Call Recipient to Get Address</label>
                    </div>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Country/Region" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="qatar">Qatar</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input placeholder="First Name" />
                        <Input placeholder="Last Name" />
                    </div>
                    <Input placeholder="Address" />
                    <Input placeholder="Apartment, suite, etc. (optional)" />
                    <Input placeholder="City" defaultValue="Mesaieed" />
                    <Input placeholder="Phone" defaultValue="+974" />
                    <div className="flex items-center gap-2">
                        <Checkbox id="save" />
                        <label htmlFor="save" className="text-sm">Save this information for next time</label>
                    </div>
                    <div className="bg-gray-100 rounded-md p-3 text-sm">
                        <p><strong>Midnight Delivery</strong> - 2025-07-27 | 23:00 - 23:59 <Button variant="link" className="p-0 text-primary">Modify Slots</Button></p>
                    </div>
                </Card>

                {/* Payment Section */}
                <PaymentBillingSection />
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-2 bg-[#FFFBF7] top-6 border border-gray-100 rounded-xl">
                <OrderSummary />
            </div>
        </div>
    );
}
