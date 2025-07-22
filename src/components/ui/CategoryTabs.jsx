// ui/CategoryTabs.jsx

export default function CategoryTabs({ categories, activeCategory, onChange }) {
  if (!categories || categories.length === 0) {
    return <p className="text-gray-500">কোনো ক্যাটাগরি পাওয়া যায়নি।</p>;
  }

  return (
    <div className="flex space-x-2 mb-6 overflow-x-auto no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-all cursor-pointer ${
            activeCategory === cat
              ? "bg-yellow-200 text-yellow-800"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
