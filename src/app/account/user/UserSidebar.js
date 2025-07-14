"use client";

import { useEffect, useState } from "react";

const sidebarItems = [
  {
    hash: "profile",
    label: "Personal Information",
  },
  {
    hash: "orders",
    label: "My Orders",
  },
  {
    hash: "address",
    label: "Saved Addresses",
  },
  {
    hash: "occassions",
    label: "My Occassions",
  },
  {
    hash: "",
    label: "Logout",
  },
  {
    hash: "",
    label: "Delete Account",
  },
];

export default function UserSidebar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const updateHash = () => setActive(window.location.hash.slice(1));
    window.addEventListener("hashchange", updateHash);
    updateHash();
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);


  const handleSidbarItemClick = (item) => {
      window.location.hash =  item.hash;
      setActive(item.hash)
  }

  return (
    <div className="w-full md:w-1/4 border-r border-gray-200">
      <div className="bg-olive-600 text-white rounded-t-xl py-4 px-4">
        <h2 className="font-bold">Hey Munir Uddin Mahbub</h2>
      </div>
      <ul className="bg-white">
        {sidebarItems.map((item) => (
          <li
            key={item}
            onClick={() => handleSidbarItemClick(item)}
            className={`py-3 px-5 text-sm border-b hover:bg-gray-50 cursor-pointer ${
              item.hash && active === item.hash ? "text-olive-700 font-semibold" : "text-gray-600"
            }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
