"use client";

import ConfirmationSummary from "@/components/checkout/ConfirmationSummary";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Lucide Icons

export default function Confirmation() {
    const [isMobile, setIsMobile] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    // ধরো এই ভ্যালু API বা context থেকে আসছে
    const totalAmount = 150; // এক্সাম্পল টোটাল QAR

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize(); // initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-5 gap-6 p-2 max-w-screen-lg mx-auto">
            <div className="lg:sticky  lg:col-span-3 space-y-6">
                <OrderConfirmation />
            </div>

            {/* মোবাইলে ড্রপডাউন */}
            {isMobile ? (
                <div className="lg:sticky  lg:hidden">
                    <button
                        className="w-full bg-[#FFFBF7] border border-gray-200 rounded-xl p-3 text-left font-semibold flex justify-between items-center"
                        onClick={() => setShowSummary(!showSummary)}
                    >
                        <div>
                            Order Summary
                            <span className="block text-sm font-normal text-gray-500">
                                Total: QAR {totalAmount}
                            </span>
                        </div>
                        {showSummary ? (
                            <ChevronUp className="w-5 h-5" />
                        ) : (
                            <ChevronDown className="w-5 h-5" />
                        )}
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            showSummary ? "max-h-[1000px] mt-2" : "max-h-0"
                        }`}
                    >
                        <div className="bg-[#FFFBF7] border border-gray-100 rounded-xl">
                            <ConfirmationSummary />
                        </div>
                    </div>
                </div>
            ) : (
                // ডেক্সটপে নরমালি দেখাবে
                <div className="lg:sticky  lg:col-span-2 bg-[#FFFBF7] border border-gray-100 rounded-xl top-6 h-fit">
                    <ConfirmationSummary />
                </div>
            )}
        </div>
    );
}
