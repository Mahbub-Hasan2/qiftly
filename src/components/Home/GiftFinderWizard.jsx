"use client";

import { useState } from "react";

const recipientOptions = ["Friend", "Wife", "Dad", "Colleague"];
const budgetOptions = ["Under 100", "Under 200", "300+"];

const giftSuggestions = {
  Friend: {
    "Under 100": ["Custom Mug - QAR 80"],
    "Under 200": ["Flower & Chocolate Combo - QAR 180"],
    "300+": ["Premium Perfume Hamper - QAR 320"]
  },
  Wife: {
    "Under 100": ["Scented Candle Set - QAR 95"],
    "Under 200": ["Floral Bouquet + Cake - QAR 180"],
    "300+": ["Jewelry Box + Perfume - QAR 350"]
  },
  Dad: {
    "Under 100": ["Islamic Wooden Frame - QAR 90"],
    "Under 200": ["Attar Perfume Box - QAR 170"],
    "300+": ["Luxury Date Gift Set - QAR 320"]
  },
  Colleague: {
    "Under 100": ["Desk Plant - QAR 70"],
    "Under 200": ["Corporate Hamper - QAR 190"],
    "300+": ["Executive Desk Set - QAR 310"]
  }
};

export default function GiftFinderWizard() {
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState(null);
  const [budget, setBudget] = useState(null);

  const handleRecipient = (r) => {
    setRecipient(r);
    setStep(2);
  };

  const handleBudget = (b) => {
    setBudget(b);
    setStep(3);
  };

  const resetWizard = () => {
    setStep(1);
    setRecipient(null);
    setBudget(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">🎁 Gift Finder Wizard</h2>

      {step === 1 && (
        <div>
          <p className="text-lg mb-4 text-center">Whom are you buying for?</p>
          <div className="flex flex-wrap justify-center gap-4">
            {recipientOptions.map((r) => (
              <button
                key={r}
                onClick={() => handleRecipient(r)}
                className="px-4 py-2 bg-pink-100 hover:bg-pink-200 rounded-full text-sm shadow"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="text-lg mb-4 text-center">What’s your budget?</p>
          <div className="flex flex-wrap justify-center gap-4">
            {budgetOptions.map((b) => (
              <button
                key={b}
                onClick={() => handleBudget(b)}
                className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded-full text-sm shadow"
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center">
          <p className="text-lg mb-2">
            🎯 Recommended for <span className="font-semibold">{recipient}</span> under <span className="font-semibold">{budget}</span>:
          </p>
          <ul className="mt-4 space-y-2">
            {giftSuggestions[recipient][budget].map((gift, idx) => (
              <li
                key={idx}
                className="bg-gray-100 py-2 px-4 rounded-md shadow text-sm"
              >
                {gift}
              </li>
            ))}
          </ul>
          <button
            onClick={resetWizard}
            className="mt-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
          >
            🔄 Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
