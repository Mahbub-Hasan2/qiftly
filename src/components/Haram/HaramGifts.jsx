'use client';

import { useState } from 'react';
import { AlertTriangle, Search } from 'lucide-react';

const giftsData = [
    {
        name: "Alcoholic Beverages (Wine, Beer, Whisky, etc.)",
        reason: "Intoxicants are strictly prohibited in Islam (Quran 5:90).",
        alternative: "Non-Alcoholic Sparkling Juices, Zamzam Water Gift Sets",
    },
    {
        name: "Statues, Sculptures & Figurines",
        reason: "Islam prohibits creating or keeping idol-like figures (Hadith: Bukhari 5957).",
        alternative: "Islamic Calligraphy, Abstract Art Decor",
    },
    {
        name: "Musical Instruments as Gifts (Guitar, Drum, etc.)",
        reason: "Many scholars consider music instruments impermissible in Islam (Hadith: Abu Dawood 4920).",
        alternative: "Digital Quran Player, Zikir Audio Box",
    },
    {
        name: "Perfumes Containing Alcohol",
        reason: "Alcohol in perfumes may contain intoxicants.",
        alternative: "Halal Alcohol-Free Perfumes",
    },
    {
        name: "Romantic Cards or Gifts for Non-Married Couples",
        reason: "Promotes unlawful relationships (zina).",
        alternative: "Spouse-Specific Gifts with Islamic Quotes",
    },
    {
        name: "Astrology Gifts (Zodiac Charms, Horoscope Books)",
        reason: "Belief in astrology is shirk and contradicts Tawheed.",
        alternative: "Islamic Calendar, Dua Reminder Cards",
    },
    {
        name: "Dream Catchers & Superstition Items",
        reason: "Encourages reliance on superstition instead of Allah.",
        alternative: "Ayatul Kursi Wall Hangings",
    },
    {
        name: "Gifts with Explicit or Nude Images",
        reason: "Violates modesty and decency in Islam.",
        alternative: "Islamic Minimalist Art, Nature Photography",
    },
    {
        name: "Pork or Pork-Based Food Hampers",
        reason: "Pork is haram in Islam (Quran 2:173).",
        alternative: "Halal Food Hampers (Dates, Nuts, Honey)",
    },
    {
        name: "Gambling Sets (Poker, Casino Chips)",
        reason: "Gambling is strictly forbidden in Islam (Quran 5:90).",
        alternative: "Islamic Educational Games, Puzzle Sets",
    },
    {
        name: "Magic Trick Sets, Tarot Cards",
        reason: "Involves sihr (magic), which is haram in Islam.",
        alternative: "Islamic Story Books, Prophets Biography Sets",
    },
    {
        name: "Non-Halal Meat Hampers (Without Certification)",
        reason: "Unverified meat may be non-halal.",
        alternative: "Certified Halal Meat Hampers",
    },
    {
        name: "Fortune Cookies with Predictions",
        reason: "Encourages belief in future knowledge unknown to humans.",
        alternative: "Dua Cards, Islamic Reminder Cookies",
    },
    {
        name: "Buddha Statues or Religious Figurines",
        reason: "Islam prohibits owning or gifting religious statues.",
        alternative: "Islamic Frames or Digital Quran Devices",
    },
    {
        name: "Cross Jewelry or Religious Symbols (Non-Islamic)",
        reason: "Muslims are discouraged from wearing or gifting symbols of other faiths.",
        alternative: "Allah Name Pendant, Shahada Jewelry",
    },
    {
        name: "Fireworks or Dangerous Explosives",
        reason: "Wastage and risk of harm, Islamically discouraged.",
        alternative: "Eco-Friendly Celebration Decorations",
    },
    {
        name: 'Alcohol / Wine Gift Set',
        reason: 'Contains intoxicants, strictly prohibited in Islam.',
        alternative: 'Non-Alcoholic Drinks (Date Juice, Sparkling Juice)',
    },
    {
        name: 'Statues / Sculptures',
        reason: 'Islam strictly prohibits idol-like figures in decoration.',
        alternative: 'Islamic Wall Art or Calligraphy',
    },
    {
        name: 'Musical Instruments',
        reason: 'Musical instruments are considered haram in many Islamic opinions.',
        alternative: 'Islamic Zikir Box or Audio Pen',
    },
    {
        name: 'Perfumes with Alcohol',
        reason: 'May contain prohibited alcohol-based substances.',
        alternative: 'Halal Alcohol-Free Perfumes',
    },
    {
        name: 'Nude or Semi-nude Art',
        reason: 'Violates Islamic principles of modesty and decency.',
        alternative: 'Islamic Minimal Art',
    },
];

export default function HaramGifts() {
    const [query, setQuery] = useState('');

    const filteredGifts = giftsData.filter((gift) =>
        gift.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-red-600 flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" />
                Haram Gifts Awareness
            </h1>

            <p className="mb-6 text-gray-700">
                We do not sell or promote the following items as they are considered <span className="font-semibold text-red-500">Haram</span> (forbidden) in Islam.
                Please avoid gifting these to others. Choose the halal alternatives.
            </p>

            {/* Search */}
            <div className="flex items-center mb-6 bg-gray-100 rounded px-3 py-2">
                <Search className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search Haram Gifts..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent outline-none"
                />
            </div>

            {/* Product List */}
            <div className="grid md:grid-cols-2 gap-6">
                {filteredGifts.length > 0 ? (
                    filteredGifts.map((gift, index) => (
                        <div key={index} className="border border-red-200 rounded-lg p-5 relative bg-white shadow-sm hover:shadow-md transition">
                            <div className="absolute top-0.5 right-0.5 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                🚫 Haram – Not for Sale
                            </div>
                            <h2 className="text-xl font-semibold text-red-600 mb-2">{gift.name}</h2>
                            <p className="text-gray-600 mb-3"><strong>Why:</strong> {gift.reason}</p>
                            <p className="text-green-700"><strong>Halal Alternative:</strong> {gift.alternative}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No matching items found.</p>
                )}
            </div>

            <div className="mt-8 text-xs text-gray-400 text-center">
                ⚠️ For Islamic educational purposes only. Consult scholars if unsure.
            </div>
        </div>
    );
}
