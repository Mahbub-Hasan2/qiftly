"use client";

import React, { useState } from "react";

export function Select({ children, onValueChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onValueChange) onValueChange(value); // ✅ trigger parent handler
  };

  // pass `handleSelect` and `selectedValue` to children
  const clonedChildren = React.Children.map(children, (child) => {
    if (!child) return null;

    // inject props into SelectItem and SelectTrigger
    if (child.type === SelectTrigger) {
      return React.cloneElement(child, {
        onClick: () => setIsOpen((prev) => !prev),
        value: selectedValue,
      });
    }

    if (child.type === SelectContent) {
      const contentChildren = React.Children.map(child.props.children, (subChild) => {
        if (subChild.type === SelectItem) {
          return React.cloneElement(subChild, {
            onSelect: () => handleSelect(subChild.props.value),
          });
        }
        return subChild;
      });

      return React.cloneElement(child, {
        isOpen,
        children: contentChildren,
      });
    }

    return child;
  });

  return <div className="relative w-full">{clonedChildren}</div>;
}


export function SelectTrigger({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-full border border-gray-300 px-4 py-2 rounded flex justify-between items-center bg-white"
    >
      {children}
    </button>
  );
}

export function SelectValue({ value }) {
  return <span className="text-gray-700">{value || "Select option"}</span>;
}

export function SelectContent({ isOpen, children }) {
  if (!isOpen) return null;
  return (
    <div className="absolute z-10 w-full mt-1 border bg-white rounded shadow">
      {children}
    </div>
  );
}

export function SelectItem({ children, onSelect, value }) {
  return (
    <div
      onClick={() => onSelect?.(value)}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
    >
      {children}
    </div>
  );
}
