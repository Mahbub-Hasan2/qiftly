import Contents from "./Contents";
import UserSidebar from "./UserSidebar";

export default function Account() {
  return (
    <main className="bg-gray-50 min-h-screen ">
      <div className="max-w-7xl  mx-auto pt-10 md:pt-5 pb-10 px-4">
        <h2 className="text-3xl mb-6 pb-2 font-bold border-b border-b-gray-200 hidden md:block">
          Profile
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <UserSidebar />
          <Contents />
        </div>
      </div>
    </main>
  );
}
