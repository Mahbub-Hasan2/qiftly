'use client';

import Image from 'next/image';

const rooms = [
  {
    name: 'Living Room',
    image: '/decor/living-room.jpg',
    tips: [
      'Use cozy throw pillows and layered rugs.',
      'Add a statement wall art piece.',
      'Incorporate warm lighting with floor lamps.',
    ],
  },
  {
    name: 'Bedroom',
    image: '/decor/bedroom.jpg',
    tips: [
      'Choose soft, neutral bedding.',
      'Hang string lights or fairy lights.',
      'Place an indoor plant on the nightstand.',
    ],
  },
  {
    name: 'Kitchen',
    image: '/decor/kitchen.jpg',
    tips: [
      'Use colorful storage jars and spice racks.',
      'Add a small herb garden on the windowsill.',
      'Install stylish pendant lights above counters.',
    ],
  },
  {
    name: 'Office Desk',
    image: '/decor/office.jpg',
    tips: [
      'Organize with minimalist desk organizers.',
      'Add an inspirational quote frame.',
      'Use a compact desk plant for freshness.',
    ],
  },
  {
    name: 'Balcony / Garden',
    image: '/decor/garden.jpg',
    tips: [
      'Use string lights and outdoor cushions.',
      'Add a small coffee table or swing.',
      'Hang wall planters or potted plants.',
    ],
  },
];

export default function RoomWiseDecor() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">🏠 Room-wise Decor Inspirations</h2>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div key={room.name} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="h-52 w-full relative">
              <Image
                src={room.image}
                alt={room.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-2xl"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{room.name}</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {room.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
