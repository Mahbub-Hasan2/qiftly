// src/components/ui/checkbox.jsx
export const Checkbox = ({ label, checked, onChange, className = "", ...props }) => (
  <label className={`flex items-center gap-2 cursor-pointer text-sm ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 accent-primary"
      {...props}
    />
    <span>{label}</span>
  </label>
);
