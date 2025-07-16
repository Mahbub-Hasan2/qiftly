import HaramGifts from "@/components/Haram/HaramGifts";
import HaramGiftsTable from "@/components/Haram/HaramGiftsTable";

export default function Haram() {
  return (
    <main className="md:p-4 p-1 flex items-center justify-center">
      <div className="w-full max-w-7xl">
        <HaramGifts />
        <HaramGiftsTable />
      </div>
    </main>
  );
}
