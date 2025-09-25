"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email:"", password:"" });
  const [error, setError] = useState(null);
  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      const res = await fetch("/api/login", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        credentials: "same-origin", // <<< ensure cookies handled
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(res.ok && data.success) {
        // cookie set by server, redirect to profile
        // use full navigation so UserContext can re-check cookie on mount
        router.push("/account/user");
      } else {
        setError(data.error || "Login failed");
      }
    } catch(err){ setError("Server error"); }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Login</h2>
      <div className="mb-3">
        <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
      </div>
      <Button type="submit" className="w-full">Login</Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
