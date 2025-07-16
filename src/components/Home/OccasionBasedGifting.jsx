"use client";

import Image from "next/image";

const occasions = [
  {
    name: "Birthday Gifts",
    image: "https://i.ebayimg.com/00/s/Mjg4WDI4OA==/z/JFUAAeSw21hoZTxE/$_57.JPG",
  },
  {
    name: "Anniversary Gifts",
    image: "/occasions/anniversary.jpg",
  },
  {
    name: "Ramadan Gifts",
    image: "/occasions/ramadan.jpg",
  },
  {
    name: "Housewarming Gifts",
    image: "/occasions/housewarming.jpg",
  },
  {
    name: "Baby Shower Gifts",
    image: "/occasions/babyshower.jpg",
  },
];

export default function OccasionBasedGifting() {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-800">
        Shop by Occasion
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {occasions.map((occasion, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
          >
            <Image
              src={occasion.image}
              alt={occasion.name}
              width={300}
              height={200}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-2 text-sm font-medium">
              {occasion.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
