"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email:"", password:"" });
  const [error, setError] = useState(null);
  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      const res = await fetch("/api/login", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(formData)});
      const data = await res.json();
      if(data.success) alert("Login successful, Token: "+data.accessToken);
      else setError(data.error);
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
