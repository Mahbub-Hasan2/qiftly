import OccasionContent from "./OccasionContent";
import Contents from "./Contents";
import UserSidebar from "./UserSidebar";

export default function Account() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col md:flex-row gap-6">
        <UserSidebar />
        <Contents />
      </div>
    </main>
  );
}
