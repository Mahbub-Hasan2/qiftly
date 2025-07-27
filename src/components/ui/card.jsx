// src/components/ui/card.jsx
export const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-xl shadow-sm p-4 ${className}`}>
    {children}
  </div>
);


