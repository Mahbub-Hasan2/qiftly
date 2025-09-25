// src/app/api/login/route.js
import { NextResponse } from "next/server";
import { createCustomerAccessToken } from "@/lib/shopify";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const tokenResp = await createCustomerAccessToken(email, password);
    if (tokenResp.userErrors?.length) {
      return NextResponse.json({ success: false, error: tokenResp.userErrors[0].message }, { status: 401 });
    }

    const token = tokenResp.customerAccessToken.accessToken;
    const expiresAt = new Date(tokenResp.customerAccessToken.expiresAt).getTime();
    const maxAgeSeconds = Math.floor((expiresAt - Date.now()) / 1000);

    const res = NextResponse.json({ success: true });
    res.cookies.set("shopify_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: maxAgeSeconds > 0 ? maxAgeSeconds : 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("login error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
