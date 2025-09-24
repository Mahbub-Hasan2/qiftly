import { shopifyFetch } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, { input: { email, password } });
    const result = data.customerAccessTokenCreate;

    if (result.customerAccessToken) {
      return NextResponse.json({ success: true, accessToken: result.customerAccessToken.accessToken });
    } else {
      return NextResponse.json({ success: false, error: result.userErrors[0]?.message || "Login failed" }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
