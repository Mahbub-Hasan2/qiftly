import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const otpStore = new Map(); // ⚠️ Production-এ DB ব্যবহার করা উচিত

export async function POST(req) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, { code: otp, expires: Date.now() + 3 * 60 * 1000 }); // 3 মিনিটের জন্য OTP
console.log("email and passs =================",process.env.OTP_EMAIL,process.env.OTP_PASSWORD,)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.OTP_EMAIL,
      pass: process.env.OTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.OTP_EMAIL,
      to: email,
      subject: "Your OTP Code",
      html: `<h3>Your OTP Code: ${otp}</h3><p>This code will expire in 3 minutes.</p>`,
    });

    return NextResponse.json({ message: "OTP sent" });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 });
  }
}

export { otpStore };
