'use client'

import { createContext, useContext, useState } from "react";

const AddressContext = createContext();

export const useAddress = () => useContext(AddressContext);

export function AddressProvider ({ children }){
  const [addresses, setAddresses] = useState([]);
console.log(addresses)
  const addAddress = (address) => {
    setAddresses((prev) => [...prev, address]);
  };

  return <AddressContext.Provider value={{ addresses, addAddress }}>{children}</AddressContext.Provider>;
};