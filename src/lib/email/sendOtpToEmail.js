// src/lib/email/sendOtpToEmail.js
import axios from "axios";

export async function sendOtpToEmail(email) {
  const res = await axios.post("/api/send-otp", { email });
  return res.data;
}

export async function verifyOtp(email, otp) {
  const res = await axios.post("/api/verify-otp", { email, otp });
  return res.data;
}
