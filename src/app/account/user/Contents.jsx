"use client";

import React, { useEffect, useState } from "react";
import PersonalInfo from "./PersonalInfo";
import Orders from "./Orders";
import OccasionContent from "./OccasionContent";
import SavedAddresses from "./SavedAddresses";

export default function Contents({customer}) {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash.slice(1));
    window.addEventListener("hashchange", updateHash);
    updateHash();
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const renderContent = () => {
    switch (hash) {
      case "orders":
        return <Orders />;
      case "address":
        return <SavedAddresses />;
      case "occassions":
        return <OccasionContent />;
      case "profile":
      default:
        return <PersonalInfo customer={customer} />; // ডিফল্ট হিসেবে PersonalInfo
    }
  };

  return <div className="w-full md:flex-1">{renderContent()}</div>;
}
