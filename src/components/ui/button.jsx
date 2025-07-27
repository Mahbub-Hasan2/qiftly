// src/components/ui/button.jsx
export const Button = ({ children, className = "", ...props }) => (
  <button
    className={`bg-[#818035] text-white px-4 py-2 rounded hover:bg-[#6c6a2d] transition text-sm ${className}`}
    {...props}
  >
    {children}
  </button>
);
