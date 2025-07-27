import React, { useState } from "react";

export const Input = ({
  label,
  placeholder,
  type = "text",
  className = "",
  value,
  onChange,
  defaultValue, // এটা ইনপুটে না পাঠিয়ে কেবল লোকাল স্টেটে ব্যবহৃত হবে
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
        placeholder=" " // যাতে লেবেল ইনপুটের ভিতরে float করে
        className={`peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200 ${className}`}
        {...props}
      />
      <label
        className={`absolute left-3 px-1 bg-white transition-all duration-200 pointer-events-none ${
          shouldFloat
            ? "top-1 text-xs text-primary"
            : "top-3.5 text-sm text-gray-400"
        }`}
      >
        {labelText}
      </label>
    </div>
  );
};
