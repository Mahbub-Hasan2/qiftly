import axios from "axios";

export async function verifyOtp(email, otp) {
  try {
    const res = await axios.post("/api/verify-otp", { email, otp });
    return res.data;
  } catch (error) {
    throw new Error("OTP সঠিক নয় বা মেয়াদ শেষ।");
  }
}
