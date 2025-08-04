"use client";

import { useState, useEffect } from "react";
import { sendOtpToEmail } from "@/lib/email/sendOtpToEmail";
import { verifyOtp } from "@/lib/email/verifyOtp";

export default function EmailVerificationForm({ email, onVerified }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(180); // 3 minutes
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    sendOtp();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const updated = [...otp];
      updated[index] = value;
      setOtp(updated);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const sendOtp = async () => {
    try {
      await sendOtpToEmail(email);
      setTimer(180);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      setError("সঠিকভাবে ৬ ডিজিট OTP দিন।");
      return;
    }

    try {
      const result = await verifyOtp(email, code);
      if (result.verified) {
        onVerified();
      } else {
        setError("OTP ভুল হয়েছে।");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border p-6 max-w-sm mx-auto"
    >
      <h2 className="text-center text-lg font-semibold mb-4">
        Create your Evaly account
      </h2>
      <p className="text-sm text-center text-muted-foreground mb-3">
        To Confirm The Email Enter 6 Digit OTP Here
      </p>

      <div className="flex justify-between gap-2 mb-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-10 h-12 text-center border border-gray-300 rounded"
          />
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-500 text-center mb-2">{error}</p>
      )}

      {timer > 0 ? (
        <p className="text-sm text-green-600 text-center mb-4">
          Resend After {("0" + Math.floor(timer / 60)).slice(-2)}:
          {("0" + (timer % 60)).slice(-2)}
        </p>
      ) : (
        <button
          type="button"
          onClick={sendOtp}
          disabled={resending}
          className="text-sm text-blue-600 underline mb-4"
        >
          {resending ? "Sending..." : "Resend OTP"}
        </button>
      )}

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Create Account
      </button>

      <p className="text-sm text-center mt-3">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 underline">
          Sign in
        </a>
      </p>
    </form>
  );
}
