// src/app/api/send-otp/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveOtp } from "@/lib/otpStore";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, message: "Invalid email" }, { status: 400 });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in redis (TTL 3 minutes)
    await saveOtp(email, otp, 180);

    // nodemailer transporter (Gmail example)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true" ? true : false, // true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Qiftly" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Qiftly OTP",
      text: `Your OTP code is: ${otp}. It will expire in 3 minutes.`,
      html: `<p>Your OTP code is: <b>${otp}</b></p><p>It will expire in 3 minutes.</p>`,
    });

    console.log("OTP sent to", email, otp);
    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error("send-otp error:", err);
    return NextResponse.json({ success: false, message: "Failed to send OTP" }, { status: 500 });
  }
}
