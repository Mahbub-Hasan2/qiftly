// D:\Qiftly All Work\Website\qiftly\src\components\checkout\OrderConfirmation.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderConfirmation() {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("latestOrder");
        if (stored) {
            setOrder(JSON.parse(stored));
            // যদি চান, একবার দেখানোর পর মুছে ফেলুন:
            localStorage.removeItem("latestOrder");
        }
    }, []);

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col md:flex-row justify-between items-center border-t pt-4 gap-4 w-full max-w-2xl">
                    <div className="text-center md:text-left mb-2 md:mb-0">
                        {/* ✅ Professional English message */}
                        <p className="text-sm text-gray-700 mb-3">
                            If you have placed an order, our team will reach out to you shortly.
                            Please rest assured, you are in safe hands.
                        </p>

                        <span>
                            Need help?
                            <Link
                                href="/"
                                className="text-sm text-primary hover:underline ml-1"
                            >
                                Contact us
                            </Link>
                        </span>
                    </div>

                    <Link href="/">
                        <button className="bg-primary text-white px-6 py-2 rounded cursor-pointer transition">
                            Continue shopping
                        </button>
                    </Link>
                </div>
            </div>

        );
    }

    const { orderName, invoiceUrl, status, address, email, paymentMethod, total, cartItems, id } = order;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-0 md:p-4">
            <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full p-6 space-y-6">
                <div className="text-center">
                    <div className="text-green-600 text-3xl mb-2">&#10003;</div>
                    <h2 className="text-xl font-semibold">Thank you, {address?.fullName || "Customer"}!</h2>
                    <p className="text-sm text-gray-600">Confirmation {orderName || id} ({status})</p>
                    {invoiceUrl && (
                        <p className="mt-1">
                            <a href={invoiceUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                                View Invoice
                            </a>
                        </p>
                    )}
                </div>

                <h3 className="font-semibold mb-2 text-lg">Order details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                        <p><span className="font-semibold">Contact Information:</span><br />{email}</p>
                        <p className="mt-2">
                            <span className="font-semibold">Shipping address:</span><br />
                            {address?.fullName}<br />
                            {address?.street}, {address?.city}<br />
                            Qatar<br />
                            {address?.phone}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Payment method</h3>
                        <p>{paymentMethod} -<br />QAR {total}</p>

                        <p className="mt-4">
                            <span className="font-medium">Billing address:</span><br />
                            {address?.fullName}<br />
                            {address?.street}, {address?.city}<br />
                            Qatar<br />
                            {address?.phone}
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Items</h3>
                    <ul className="space-y-2 text-sm">
                        {Array.isArray(cartItems) && cartItems.map((item, idx) => (
                            <li key={idx} className="flex justify-between border-b pb-1">
                                <span>{item.title || item.name} × {item.quantity}</span>
                                <span>QAR {Number(item.price || 0) * Number(item.quantity || 1)}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center border-t pt-4">
                    <span>
                        Need help?
                        <Link href="/" className="text-sm text-primary hover:underline mb-2 md:mb-0"> Contact us</Link>
                    </span>
                    <Link href="/">
                        <button className="bg-primary text-white px-6 py-2 rounded cursor-pointer transition">Continue shopping</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
