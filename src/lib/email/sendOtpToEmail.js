import axios from "axios";

export async function sendOtpToEmail(email) {
  try {
    const res = await axios.post("/api/send-otp", { email });
    return res.data;
  } catch (error) {
    throw new Error("OTP পাঠানো যায়নি। দয়া করে আবার চেষ্টা করুন।");
  }
}
