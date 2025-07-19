import React from 'react'
import { twMerge } from 'tailwind-merge';

function InputField ({label, type, value, name,required, onChange, className, placeholder, containerClassName, disabled = false}) {
  return (
    <div className={twMerge("w-full", containerClassName)}>
      <label htmlFor={label.split(" ").join("")} className="text-gray-800 font-semibold text-sm mb-2 inline-block">
       {label}
      </label>
      <input
        type={type}
        value={value}
        id={label.split(" ").join("")} 
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={twMerge("input-field font-normal", className)}
      />
    </div>
  );
};

export default InputField