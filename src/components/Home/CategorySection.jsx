'use client';

import Image from 'next/image';

const categories = {
  'Beautifully Curated': [
    {
      label: '30 Mins',
      image: 'https://www.fnp.qa/cdn/shop/files/30_minutes_9b0d8995-04a8-48fc-83b1-4b03814a8e81.png?v=1752218008&width=300',
    },
    {
      label: 'Combos',
      image: 'https://www.fnp.qa/cdn/shop/files/30_minutes_9b0d8995-04a8-48fc-83b1-4b03814a8e81.png?v=1752218008&width=300',
    },
    { label: 'Flowers', image: '/categories/flowers.png' },
    { label: 'Cakes', image: '/categories/cakes.png' },
    { label: 'Perfumes', image: '/categories/perfumes.png' },
    { label: 'Chocolate', image: '/categories/chocolate.png' },
    { label: 'Hamper', image: '/categories/hamper.png' },
    { label: 'Branded Gifts', image: '/categories/branded.png' },
  ],
  'Gifts for Every Occasion': [
    {
      label: 'Birthday',
      image: 'https://www.fnp.qa/cdn/shop/files/30_minutes_9b0d8995-04a8-48fc-83b1-4b03814a8e81.png?v=1752218008&width=300',
    },
    { label: 'Anniversary', image: '/categories/anniversary.png' },
    { label: 'Umrah', image: '/categories/umrah.png' },
    { label: 'Love n Romance', image: '/categories/love.png' },
    { label: 'Get Well Soon', image: '/categories/get-well.png' },
    { label: 'New Born', image: '/categories/new-born.png' },
    { label: 'Congrats', image: '/categories/congrats.png' },
    { label: 'Offers', image: '/categories/offers.png' },
  ],
};

export default function CategorySection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {Object.entries(categories).map(([section, items]) => (
        <div key={section} className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">{section}</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {items.map(({ label, image }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <div className="w-full aspect-[1/1] relative">
                  <Image
                    src={image}
                    alt={label}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           25vw"
                  />
                </div>
                <p className="text-sm mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
