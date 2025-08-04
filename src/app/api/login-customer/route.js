import { NextResponse } from "next/server";
import shopifyFetch from "@/lib/shopify";

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

  const variables = {
    input: { email, password },
  };

  try {
    const result = await shopifyFetch(query, variables);
    const data = result?.customerAccessTokenCreate;

    if (data?.customerAccessToken?.accessToken) {
      return NextResponse.json({
        success: true,
        accessToken: data.customerAccessToken.accessToken,
        expiresAt: data.customerAccessToken.expiresAt,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error:
          data.userErrors?.[0]?.message || "Login failed. Invalid credentials.",
      },
      { status: 401 }
    );
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
