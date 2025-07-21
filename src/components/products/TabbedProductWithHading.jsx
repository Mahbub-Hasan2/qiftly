'use client';

import { useState, useEffect } from 'react';
import PerfectProductSlider from './PerfectProductSlider';

export default function TabbedProductWithHeading({ title, subtitle, tabsData }) {
  const tabNames = tabsData ? Object.keys(tabsData) : [];
  const [activeTab, setActiveTab] = useState(tabNames[0] || '');

  useEffect(() => {
    if (!activeTab && tabNames.length > 0) {
      setActiveTab(tabNames[0]);
    }
  }, [tabNames]);

  if (!tabsData || tabNames.length === 0) {
    return (
      <div className="w-full px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        <p className="text-red-500 mt-4">⚠️ No product data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      {/* Headline */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto no-scrollbar">
        {tabNames.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-yellow-200 text-yellow-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Slider */}
      <PerfectProductSlider products={tabsData[activeTab] || []} />
    </div>
  );
}
