import { NextResponse } from "next/server";
import { getCustomerByToken } from "@/lib/shopify";

export async function GET(req) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const match = cookie
      .split(";")
      .map((s) => s.trim())
      .find((s) => s.startsWith("shopify_token="));
    const token = match ? match.split("=")[1] : null;

    console.log("using token:", token); // debug

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const customer = await getCustomerByToken(token);
    if (!customer) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({ authenticated: true, customer });
  } catch (err) {
    console.error("account error:", err);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
