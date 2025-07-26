"use client";

import { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <UIContext.Provider value={{ isMobileSearch, setIsMobileSearch, isFocused, setIsFocused, isCartOpen, setIsCartOpen }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
