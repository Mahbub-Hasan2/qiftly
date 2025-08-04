import { NextResponse } from "next/server";
import { otpStore } from "../send-otp/route";

export async function POST(req) {
  const { email, otp } = await req.json();
  const stored = otpStore.get(email);

  if (!stored) {
    return NextResponse.json({ verified: false, message: "No OTP sent" }, { status: 400 });
  }

  if (stored.expires < Date.now()) {
    otpStore.delete(email);
    return NextResponse.json({ verified: false, message: "OTP expired" }, { status: 400 });
  }

  if (stored.code !== otp) {
    return NextResponse.json({ verified: false, message: "Incorrect OTP" }, { status: 400 });
  }

  otpStore.delete(email);
  return NextResponse.json({ verified: true });
}
