'use client';

import Image from 'next/image';

export default function CategorySection({tabs, title}) {

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="mb-12">
          <h2 className="text-md md:text-2xl font-bold mb-4 font-poppins ">{title}</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 md:gap-4 gap-2">
            {tabs.map((tab, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-full aspect-[1/1] relative p-1">
                  <Image
                    src={tab.img}
                    alt={tab.tabs_name}
                    fill
                    className="object-contain rounded-2xl"
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           25vw"
                  />
                </div>
                <p className="md:text-md text-xs font-poppins mt-2">{tab.tabs_name}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
