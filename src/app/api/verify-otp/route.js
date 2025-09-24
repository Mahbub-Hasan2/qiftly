import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function POST(req) {
  const { email, otp } = await req.json();

  const validOtp = await redis.get(`otp:${email}`);
  console.log('validOtp from Redis:', validOtp, 'entered OTP:', otp);

  if (validOtp && validOtp === otp) {
    await redis.del(`otp:${email}`); // OTP delete after verification
    return NextResponse.json({ verified: true });
  } else {
    return NextResponse.json({ verified: false, message: "Invalid OTP" }, { status: 400 });
  }
}
