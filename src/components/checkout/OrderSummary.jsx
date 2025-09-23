"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCart } from "../contexts/CartContext";
import { Trash2 } from "lucide-react";
import { Card } from "../ui/card";

export default function OrderSummary() {
  const { cartItems, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  return (
    <div className="rounded-xl p-4 overflow-y-auto text-sm space-y-4">
      {cartItems.map((item) => (
        <Card  key={item.id}>
          <div className="flex gap-3 items-start pb-0">
            <div className="relative w-14 h-14 flex-shrink-0">
              <Image src={item.image} alt={item.title} fill className="rounded-md object-cover border border-secondary" />
              <div className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded-full">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-medium text-gray-800">{item.title}</p>
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => updateQuantity(item.id, "dec")}
                  className="w-9 h-9 rounded-full text-2xl text-primary cursor-pointer hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, "inc")}
                  className="w-9 h-9 rounded-full text-2xl text-primary cursor-pointer hover:bg-gray-50"
                >
                  +
                </button>
                <span className="ml-auto text-gray-900 font-medium font-poppins">
                  QAR {(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.variantId)}
                >
                  <Trash2
                    size={40}
                    className="cursor-pointer p-3 bg-gray-50 text-primary rounded-full"
                  />
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <div className="text-sm space-y-1 border-t border-primary pt-2">
        <div className="flex justify-between font-medium mb-2.5">
          <span>Subtotal • {totalItems} item{totalItems > 1 ? "s" : ""}</span>
          <span>QAR {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span className="font-normal text-gray-800">Shipping</span>
          <span>Enter shipping address</span>
        </div>
        <div className="flex justify-between text-lg font-bold font-poppins pt-1">
          <span>Total</span>
          <span>QAR {totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
