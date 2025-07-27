// src/components/ui/textarea.jsx

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none ${className}`}
      {...props}
    />
  );
}
