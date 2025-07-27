import React, { useState } from "react";

export const Input = ({
  label,
  placeholder,
  type = "text",
  className = "",
  value,
  onChange,
  defaultValue,
  error, // ✅ নতুন প্রপস
  ...props
}) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || "");
  const [isFocused, setIsFocused] = useState(false);

  const currentValue = isControlled ? value : uncontrolledValue;
  const labelText = label || placeholder || "";
  const shouldFloat = isFocused || currentValue?.length > 0;

  const handleChange = (e) => {
    if (!isControlled) {
      setUncontrolledValue(e.target.value);
    }
    onChange?.(e);
  };

  return (
    <div className="relative w-full">
      <input
        type={type}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        value={currentValue}
        placeholder=" "
        className={`peer w-full border rounded-lg px-3 pt-5 pb-2 text-sm text-gray-900 focus:outline-none transition-all duration-200
          ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-primary focus:border-primary"} 
          ${className}`}
        {...props}
      />
      <label
        className={`absolute left-3 px-1 bg-white transition-all duration-200 pointer-events-none
          ${shouldFloat ? "top-1 text-xs" : "top-3.5 text-sm"}
          ${error ? "text-red-500" : shouldFloat ? "text-primary" : "text-gray-400"}`}
      >
        {labelText}
      </label>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
