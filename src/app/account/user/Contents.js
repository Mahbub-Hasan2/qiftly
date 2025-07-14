"use client";

import React, { useEffect, useState } from "react";
import PersonalInfo from "./PersonalInfo";
import Orders from "./Orders";
import OccasionContent from "./OccasionContent";
import SavedAddresses from "./SavedAddresses";

export default function Contents() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash.slice(1));
    window.addEventListener("hashchange", updateHash);
    updateHash();
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <div>
      {hash === "profile" && <PersonalInfo />}
      {hash === "orders" && <Orders />}
      {hash === "address" && <SavedAddresses />}
      {hash === "occassions" && <OccasionContent />}
    </div>
  );
}
