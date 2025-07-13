import { useState } from "react";

export default function SearchInput() {
    const [firstName, setFirstName] = useState(''); // Declare a state variable...

    return (
        <div className="relative flex items-center w-full border border-gray-300 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-yellow-300 hover:ring-1 hover:ring-gray-300 transition">
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Search for something..."
                className="w-full px-4 py-2 outline-none"
            />

            {/* ক্লিয়ার বাটন */}
            {firstName && (
                <button
                    onClick={() => setFirstName("")}
                    className="text-gray-400 hover:text-black px-3"
                >
                    ×
                </button>
            )}

            {/* ডিভাইডার */}
            <div className="h-5 w-px bg-gray-200" />

            {/* সার্চ বাটন */}
            <button className="px-3 text-gray-600 hover:text-yellow-700 cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </button>
        </div>
    );
}
