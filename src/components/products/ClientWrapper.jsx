"use client";
import dynamic from "next/dynamic";

const CartClient = dynamic(() => import("./CartClient"), { ssr: false });
const CartSidebar = dynamic(() => import("./CartSidebar"), { ssr: false });

import { useUI } from "@/components/contexts/UIContext";
import { useState } from "react";

export default function ClientWrapper({ product }) {
  const { isCartOpen, setIsCartOpen } = useUI();

  return (
    <>
      <CartClient product={product} />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={[product]}
      />
    </>
  );
}
