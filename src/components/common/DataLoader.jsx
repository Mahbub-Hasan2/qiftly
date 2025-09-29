import React from "react";
import ErrorMessage from "./ErrorMessage";

export default function DataLoader({ data, error, loading = false, children }) {
  if (loading) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-600">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage type="server" message={error} />;
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-600">কোনো তথ্য পাওয়া যায়নি।</p>
      </div>
    );
  }

  return typeof children === "function" ? children(data) : children;
}
