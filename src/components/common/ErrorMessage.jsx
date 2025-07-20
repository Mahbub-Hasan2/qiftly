// components/common/ErrorMessage.jsx

const errorMessages = {
  network: "ইন্টারনেট সংযোগে সমস্যা হয়েছে। দয়া করে পুনরায় চেষ্টা করুন।",
  notFound: "কিছুই পাওয়া যায়নি! দয়া করে পরে আবার চেষ্টা করুন।",
  unauthorized: "আপনার অনুমতি নেই। লগইন করে আবার চেষ্টা করুন।",
  server: "সার্ভারে সমস্যা হয়েছে। আমাদের টিম বিষয়টি দেখছে।",
  timeout: "অনুরোধের সময়সীমা পেরিয়ে গেছে। দয়া করে আবার চেষ্টা করুন।",
  unknown: "কিছু একটা ভুল হয়েছে। দয়া করে আবার চেষ্টা করুন।",
};

export default function ErrorMessage({ type = "unknown", message, retry }) {
  const errorMessage = message || errorMessages[type] || errorMessages.unknown;

  return (
    <div className="w-full text-center py-6 px-4 bg-red-50 border border-red-200 rounded-xl text-red-700 shadow-sm">
      <p className="text-lg font-semibold">{errorMessage}</p>
      {retry && (
        <button
          onClick={retry}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          আবার চেষ্টা করুন
        </button>
      )}
    </div>
  );
}
