// ui/CategoryTabs.jsx

export default function CategoryTabs({ categories, activeCategory, onChange }) {
  if (!categories || categories.length === 0) {
    return <p className="text-gray-500">কোনো ক্যাটাগরি পাওয়া যায়নি।</p>;
  }

  return (
    <div className="md:flex space-x-2 md:mb-0 mb-5 md:overflow-x-auto no-scrollbar border border-gray-300 rounded-3xl p-1">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`md:px-4 px-3 md:py-2 md:mb-0  py-1.5 whitespace-nowrap rounded-full md:text-sm text-xs font-medium transition-all cursor-pointer ${
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
