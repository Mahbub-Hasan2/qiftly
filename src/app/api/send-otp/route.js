import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import redis from "@/lib/redis";

export async function POST(req) {
  const { email } = await req.json();
console.log(email)
  if (!email || !email.includes("@")) {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in Redis with 3 minutes expiry
    await redis.set(`otp:${email}`, otp, "EX", 180);

    await transporter.sendMail({
      from: `"Qiftly" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    return NextResponse.json({ message: "OTP sent" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 });
  }
}
