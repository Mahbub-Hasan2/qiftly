"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  User,
  ShoppingBag,
  MapPin,
  CalendarHeart,
  LogOut,
  Trash,
} from "lucide-react";

const sidebarItems = [
  {
    hash: "profile",
    label: "Personal Information",
    icon: User,
  },
  {
    hash: "orders",
    label: "My Orders",
    icon: ShoppingBag,
  },
  {
    hash: "address",
    label: "Saved Addresses",
    icon: MapPin,
  },
  {
    hash: "occassions",
    label: "My Occassions",
    icon: CalendarHeart,
  },
  {
    hash: "",
    label: "Logout",
    icon: LogOut,
  },
  {
    hash: "",
    label: "Delete Account",
    icon: Trash,
  },
];

export default function UserSidebar() {
  const [active, setActive] = useState("");
  
  const profileImg = null;
  const fullName = "Munir Uddin Mahbub";

  useEffect(() => {
    const updateHash = () => setActive(window.location.hash.slice(1));
    window.addEventListener("hashchange", updateHash);
    updateHash();
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const handleSidbarItemClick = (item) => {
    window.location.hash = item.hash;
    setActive(item.hash);
  };

  return (
    <div className={`w-full min-w-60 md:w-1/4 md:border-r  border-gray-200  rounded-t-xl overflow-clip ${active ? "hidden md:block" : ""}`}>
      <div className="bg-primary text-white py-6 px-4 flex items-center gap-3">
        {profileImg ? (
          <Image src={profileImg} className="size-10 bg-amber-200 rounded-full border-2 object-cover border-secondary"/>
        ) : (
          <div className="size-10 shrink-0 bg-gray-200 text-gray-800 font-semibold grid place-items-center text-lg rounded-full border-2 border-secondary">
            {fullName.split(" ")[0].slice(0, 1).toLocaleUpperCase() +
              fullName.split(" ")[1]?.slice(0, 1).toLocaleUpperCase()}
          </div>
        )}
        <h2 className="font-bold text-xl line-clamp-1">Hey {fullName}</h2>
      </div>


      <ul className="flex flex-col gap-4 md:mt-4">
        {sidebarItems.map((item, idx) => (
          <li
            key={item.label}
            onClick={() => handleSidbarItemClick(item)}
            className={`p-4 md:p-0 rounded-xl md:rounded-none md:pr-5 text-md text-gray-400 hover:text-primary cursor-pointer flex items-center border md:border-0 border-gray-200 gap-6 group ${
              item.hash && active === item.hash
                ? "md:border-r-2 md:border-r-secondary md:text-primary"
                : ""
            } ${idx===0 ? "rounded-t-none" : ""}`}
          >
           <span className={`size-10 shrink-0 grid place-items-center rounded-full text-gray-400 group-hover:bg-gray-200 ${item.hash && item.hash === active ? "bg-gray-200" : ""}`}>
            {<item.icon size={20} />}
            </span> 
            {item.label}
          </li>
        ))}
      </ul>

    </div>
  );
}
