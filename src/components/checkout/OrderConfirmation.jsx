import Link from "next/link";
import React from "react";

export default function OrderConfirmation() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-0 md:p-4">
            <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full p-6 space-y-6">
                {/* Header */}
                <div className="text-center">
                    <div className="text-green-600 text-3xl mb-2">&#10003;</div>
                    <h2 className="text-xl font-semibold">Thank you, munir uddin!</h2>
                    <p className="text-sm text-gray-600">Confirmation #STOZQFPMSH</p>
                </div>

                {/* Map */}
                <div className="w-full h-56 overflow-hidden rounded">
                    <iframe
                        title="Shipping Map"
                        className="w-full h-full"
                        src="https://www.google.com/maps?q=Putijuri,+Bahubal,+Habiganj,+Sylhet,+Bangladesh&output=embed"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Confirmation text */}
                <div className="text-center text-sm text-gray-600">
                    Your order is confirmed <br />
                    You’ll receive a confirmation email with your order number shortly.
                </div>

                <h3 className="font-semibold mb-2 text-lg">Order details</h3>
                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">

                    <div>
                        <p><span className="font-semibold">Contact Information:</span><br />mahbuddev1@gmail.com</p>
                        <p className="mt-2">
                            <span className="font-semibold">Shipping address:</span><br />
                            munir uddin mahbub<br />
                            Putijuri, bahobal, Habiganj Sadar,<br />
                            Sylhet, Bangladesh<br />
                            Qatar<br />
                            +8801708765555
                        </p>
                        <p className="mt-2">
                            <span className="font-medium">Shipping method:</span><br />Custom Shipping
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Payment method</h3>
                        <p>Cash on Delivery (COD) -<br />QAR 195.00</p>

                        <p className="mt-4">
                            <span className="font-medium">Billing address:</span><br />
                            munir uddin mahbub<br />
                            Putijuri, bahobal, Habiganj Sadar,<br />
                            Sylhet, Bangladesh<br />
                            Qatar<br />
                            +8801708765555
                        </p>
                    </div>
                </div>

                {/* Help and Button */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t pt-4">
                    <span >
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
