"use client";

import { useState } from "react";
import OrderSummary from "@/components/checkout/OrderSummary";
import AddressForm from "@/components/checkout/AddressForm";
import PaymentStep from "@/components/checkout/PaymentStep";
import { motion, AnimatePresence } from "framer-motion";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";

const steps = ["Shipping", "Payment", "Success"];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <AddressForm onNext={goToNextStep} />;
      case 1:
        return <PaymentStep onNext={goToNextStep} />;
      case 2:
        return <OrderConfirmation />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">



      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-7 space-y-5 bg-white md:py-6 rounded-xl md:shadow-md md:border md:border-gray-100">{/* Stepper UI */}
          {/* Modern Stepper UI */}
          <div className="relative flex justify-between items-center">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;

              return (
                <div key={index} className="relative flex-1 flex flex-col items-center group">
                  {/* Circle */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 z-10 transition-all duration-300
            ${isCompleted
                        ? "bg-green-500 text-white border-green-500"
                        : isActive
                          ? "bg-primary text-white border-primary shadow-lg shadow-secondary"
                          : "bg-white text-gray-400 border-gray-300 group-hover:border-gray-400"}`}
                  >
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`mt-2 text-xs font-medium tracking-wide transition-colors duration-300
            ${isActive
                        ? "text-primary"
                        : isCompleted
                          ? "text-green-600"
                          : "text-gray-400 group-hover:text-gray-600"}`}
                  >
                    {step}
                  </span>

                  {/* Progress Line (except last step) */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-5 left-1/2 w-full z-0">
                      <div className="h-0.5 bg-gray-300 w-full absolute top-1/2 transform -translate-y-1/2"></div>
                      <div
                        className="h-0.5 bg-primary absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out"
                        style={{
                          width: `${Math.min(
                            Math.max(((currentStep - index) / 1) * 100, 0),
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>


          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Summary Section */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 bg-orange-50 border border-secondary rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-primary mb-4">Your Order</h2>
            <OrderSummary />
          </div>
        </div>
      </div>

    </div>
  );
}
