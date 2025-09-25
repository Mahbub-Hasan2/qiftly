// src/app/api/register/route.js
import { NextResponse } from "next/server";
import { createCustomer, createCustomerAccessToken } from "@/lib/shopify";

export async function POST(req) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    // create customer
    const createResp = await createCustomer({ firstName, lastName, email, password });
    if (createResp.customerUserErrors?.length) {
      return NextResponse.json({ success: false, error: createResp.customerUserErrors[0].message }, { status: 400 });
    }

    // create access token immediately after creating the customer
    const tokenResp = await createCustomerAccessToken(email, password);
    if (tokenResp.userErrors?.length) {
      // could not create token: return success false but customer created
      return NextResponse.json({ success: true, customer: createResp.customer, warning: tokenResp.userErrors[0].message });
    }

    const token = tokenResp.customerAccessToken.accessToken;
    const expiresAt = new Date(tokenResp.customerAccessToken.expiresAt).getTime();
    const maxAgeSeconds = Math.floor((expiresAt - Date.now()) / 1000);

    // set httpOnly cookie
    const res = NextResponse.json({ success: true, customer: createResp.customer });
    res.cookies.set("shopify_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: maxAgeSeconds > 0 ? maxAgeSeconds : 60 * 60 * 24 * 7, // fallback
    });

    return res;
  } catch (err) {
    console.error("register error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
