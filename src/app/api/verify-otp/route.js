// src/app/api/verify-otp/route.js
import { NextResponse } from "next/server";
import { getOtp, deleteOtp } from "@/lib/otpStore";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ verified: false, message: "Email and OTP are required" }, { status: 400 });
    }

    const stored = await getOtp(email);
    console.log("verify-otp: stored:", stored, "entered:", otp);

    if (!stored) {
      return NextResponse.json({ verified: false, message: "No OTP found or expired" }, { status: 400 });
    }

    if (stored !== otp) {
      return NextResponse.json({ verified: false, message: "Incorrect OTP" }, { status: 400 });
    }

    // Success: delete OTP
    await deleteOtp(email);
    return NextResponse.json({ verified: true });
  } catch (err) {
    console.error("verify-otp error:", err);
    return NextResponse.json({ verified: false, message: "Server error" }, { status: 500 });
  }
}
