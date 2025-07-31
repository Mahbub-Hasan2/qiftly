'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CategorySection({tabs, title}) {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="md:mb-0 mb-3">
          <h2 className="text-md md:text-2xl font-bold mb-4 font-poppins ">{title}</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 md:gap-4 gap-2">
            {tabs.map((tab, i) => (
              <Link key={i} href={"/collections/" + tab.tabs_name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}>
              <div className="flex flex-col items-center text-center">
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
              </Link>
            ))}
          </div>
        </div>
    </div>
  );
}
