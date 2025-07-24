// components/YouMayAlsoLike.js
import Image from "next/image";

export default function YouMayAlsoLike() {
  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold mb-6">You’ll Love These</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="border rounded-lg p-3 hover:shadow-md transition-all">
            <Image
              src="/placeholder.jpg"
              alt={`Suggested Product ${item}`}
              width={300}
              height={300}
              className="w-full h-40 object-cover rounded"
            />
            <div className="mt-2">
              <h3 className="font-semibold text-gray-700 text-sm">
                Product Title {item}
              </h3>
              <p className="text-green-600 font-bold text-sm">QAR 180</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
