import { getCustomerByToken } from "@/lib/shopify";
import UserSidebar from "./UserSidebar";
import Contents from "./Contents";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/Auth/LogoutButton";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopify_token")?.value;
  if (!token) redirect("/Auth/LogIn");

  const customer = await getCustomerByToken(token);
  if (!customer) redirect("/Auth/LogIn");

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto pt-10 md:pt-5 pb-10 px-4">
        <h2 className="text-3xl mb-6 pb-2 font-bold border-b border-b-gray-200 hidden md:block">
          Profile
        </h2>
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl mb-4">
            Welcome, {customer.firstName || customer.email}
          </h1>
          <p>
            <strong>Email:</strong> {customer.email}
          </p>
          <p>
            <strong>Name:</strong> {customer.firstName} {customer.lastName}
          </p>
          <div className="mt-4">
            <LogoutButton />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <UserSidebar />
          <Contents />
        </div>
      </div>
    </main>
  );
}
