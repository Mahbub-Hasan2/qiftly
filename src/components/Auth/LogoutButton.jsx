"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (res.ok) {
      router.push("/Auth/LogIn"); // Redirect after logout
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <button onClick={handleLogout} className="button-primary w-full bg-transparent border border-primary text-primary">
      Yes, Logout
    </button>
  );
}
