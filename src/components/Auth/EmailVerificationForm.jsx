"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EmailVerificationForm({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(180);
  const [resendAllowed, setResendAllowed] = useState(false);

  const otpSentRef = useRef(false); // ✨ Prevent multiple OTP sends on re-render

  // ✅ OTP send + timer setup
  useEffect(() => {
    if (!email) return; // ✨ Email না থাকলে কিছু হবে না

    const sendOtp = async () => {
      try {
        const res = await fetch("/api/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        console.log("Initial OTP send response:", data);
      } catch (err) {
        console.error("Failed to send OTP:", err);
        setMessage("Failed to send OTP");
      }
    };

    if (!otpSentRef.current) {
      sendOtp(); // ✨ Component load হতেই একবার OTP পাঠাও
      otpSentRef.current = true;
    }

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) { 
          clearInterval(interval); 
          setResendAllowed(true); 
          return 0; 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [email]);

  // ✅ OTP verify
  const handleVerify = async () => {
    console.log(otp, email)
    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
console.log(data)
      if (data.verified) {
        onVerified(); // ✅ Parent call after verification
      } else {
        setMessage(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("OTP verify error:", err);
      setMessage("Server error verifying OTP");
    }
  }

  // ✅ OTP resend
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
      console.log("Resend OTP response:", data);
    } catch (err) {
      console.error("Failed to resend OTP:", err);
      setMessage("Failed to resend OTP");
      setResendAllowed(true);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow text-center">
      <h2 className="text-xl mb-4">Verify Email</h2>
      <p>OTP sent to: {email}</p>
      <Input 
        type="text" 
        value={otp} 
        onChange={e => setOtp(e.target.value)} 
        placeholder="Enter OTP" 
        className="my-3" 
      />
      <Button onClick={handleVerify} className="w-full mb-2">Verify</Button>
      <p>{timer > 0 ? `Time left: ${Math.floor(timer / 60)}:${timer % 60}` : "OTP expired"}</p>
      {resendAllowed && <Button onClick={handleResend} className="mt-2">Resend OTP</Button>}
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
}
