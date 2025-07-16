'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function HaramGiftsTable() {
  const gifts = [
    {
      product: 'Alcohol / Wine Gift Set',
      reason: 'Contains intoxicants, strictly prohibited in Islam.',
      alternative: 'Non-Alcoholic Drinks (e.g. Date Juice, Sparkling Juice)',
    },
    {
      product: 'Musical Instruments',
      reason: 'Musical instruments are considered haram in many Islamic opinions.',
      alternative: 'Zikir Audio Box or Islamic Audio Pen',
    },
    {
      product: 'Nude or Semi-nude Art/Cartoons',
      reason: 'Violates Islamic principles of modesty and decency.',
      alternative: 'Islamic Wall Art or Calligraphy',
    },
    {
      product: 'Perfumes with Alcohol',
      reason: 'May contain prohibited alcohol-based substances.',
      alternative: 'Halal Alcohol-Free Perfumes',
    },
    {
      product: 'Romantic Cards for non-married couples',
      reason: 'Promotes unlawful (haram) relationships.',
      alternative: 'Spouse Gifts with Hadith Cards',
    },
    {
      product: 'Statues / Sculptures',
      reason: 'Islam strictly prohibits idol-like figures in decoration.',
      alternative: 'Islamic Frames or Digital Quran Devices',
    },
    {
      product: 'Horoscope / Zodiac Charms',
      reason: 'Encourages shirk and superstitions.',
      alternative: 'Islamic Calendar / Dua Charts',
    },
  ];

  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-red-600">
        <AlertTriangle className="text-yellow-500" />
        Haram Gifts Awareness
      </h2>

      <p className="mb-4 text-gray-700">
        Be conscious of what you gift — here are some items that should be avoided according to Islamic principles, along with better alternatives.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm md:text-base border border-gray-200 rounded shadow-sm">
          <thead className="bg-red-100 text-gray-800">
            <tr>
              <th className="px-4 py-3 border-b border-gray-200 text-left">🚫 Haram Gift</th>
              <th className="px-4 py-3 border-b border-gray-200 text-left">⚠️ Why It's Haram</th>
              <th className="px-4 py-3 border-b border-gray-200 text-left">✅ Halal Alternative</th>
            </tr>
          </thead>
          <tbody>
            {gifts.map((gift, index) => (
              <tr
                key={index}
                className="hover:bg-red-50 transition duration-200 border-b border-gray-100"
              >
                <td className="px-4 py-3 font-medium text-red-700">{gift.product}</td>
                <td className="px-4 py-3 text-gray-600">{gift.reason}</td>
                <td className="px-4 py-3 text-green-700">{gift.alternative}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        ℹ️ This is for Islamic educational purposes only. Always consult scholars if unsure.
      </div>
    </div>
  );
}
