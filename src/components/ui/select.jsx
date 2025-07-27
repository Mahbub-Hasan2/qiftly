// src/components/ui/select.jsx

"use client";

import { useState } from "react";

export function Select({ children, ...props }) {
  return (
    <div {...props} className="relative w-full">
      {children}
    </div>
  );
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

export function SelectItem({ children, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
    >
      {children}
    </div>
  );
}
