// src/components/Auth/EmailVerificationForm.jsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EmailVerificationForm({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(180);
  const [resendAllowed, setResendAllowed] = useState(false);

  useEffect(() => {
    // Start timer when component mounts
    setResendAllowed(false);
    setTimer(180);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) { clearInterval(interval); setResendAllowed(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [email]);

  const handleVerify = async () => {
    setMessage("");
    if (!otp) { setMessage("Please enter OTP"); return; }
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (data.verified) {
        onVerified();
      } else {
        setMessage(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("Verify error:", err);
      setMessage("Server error verifying OTP");
    }
  }

  const handleResend = async () => {
    setMessage("");
    setTimer(180);
    setResendAllowed(false);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      console.log("Resend response:", data);
    } catch (err) {
      console.error("Resend error:", err);
      setMessage("Failed to resend OTP");
      setResendAllowed(true);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow text-center">
      <h2 className="text-xl mb-4">Verify Email</h2>
      <p className="mb-2">OTP sent to: <b>{email}</b></p>
      <Input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" className="my-3" />
      <Button onClick={handleVerify} className="w-full mb-2">Verify</Button>
      <p>{timer > 0 ? `Time left: ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}` : "OTP expired"}</p>
      {resendAllowed && <Button onClick={handleResend} className="mt-2">Resend OTP</Button>}
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
}
