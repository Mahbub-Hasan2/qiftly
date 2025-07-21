'use client';

import { useState } from 'react';

const tabs = ['Flowers', 'Cakes', 'Chocolates'];

export default function GiftTabsForHomeCards() {
  const [activeTab, setActiveTab] = useState('Flowers');

  return (
    <div className="w-full px-4 py-6">
      {/* Headline */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Birthday Gifts</h2>
        <p className="text-sm text-gray-500">Moments That Matter</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === tab
                ? 'bg-yellow-200 text-yellow-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Data output based on tab */}
      <div>
        {activeTab === 'Flowers' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example Flower Cards */}
            <GiftCard title="Red Roses & Perfume" price="QAR 295" tag="New Arrival" />
            <GiftCard title="Purple Roses Box" price="QAR 149" tag="New Arrival" />
            <GiftCard title="Pink Bouquet" price="QAR 170" tag="30 Minutes" />
          </div>
        )}
        {activeTab === 'Cakes' && (
          <p className="text-gray-500">🎂 Cake items will show here.</p>
        )}
        {activeTab === 'Chocolates' && (
          <p className="text-gray-500">🍫 Chocolate items will show here.</p>
        )}
      </div>
    </div>
  );
}

function GiftCard({ title, price, tag }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm relative">
      {tag && (
        <span
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
            tag === 'New Arrival'
              ? 'bg-gray-200 text-gray-700'
              : 'bg-yellow-300 text-yellow-900'
          }`}
        >
          {tag}
        </span>
      )}
      <div className="h-40 bg-gray-100 rounded mb-4"></div>
      <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">{price}</p>
    </div>
  );
}
