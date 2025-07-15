import HeroSlider from "@/components/Home/HeroSlider";
import Image from "next/image";

export default function Home() {
  return (
    <main className="md:p-4 p-1 bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-7xl">
        <HeroSlider />
      </div>
    </main>
  );
}
