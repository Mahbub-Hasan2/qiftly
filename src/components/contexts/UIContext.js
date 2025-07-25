"use client";

import { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [isMobileSearch, setIsMobileSearch] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

  return (
    <UIContext.Provider value={{ isMobileSearch, setIsMobileSearch, isFocused, setIsFocused }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
