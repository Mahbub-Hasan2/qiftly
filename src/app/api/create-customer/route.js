import { NextResponse } from "next/server";
import shopifyFetch from "@/lib/shopify";

export async function POST(req) {
  const body = await req.json();
  const { firstName, lastName, email, password } = body;

  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      firstName,
      lastName,
      email,
      password,
    },
  };

  try {
    const response = await shopifyFetch(query, variables);
    const result = response?.customerCreate;

    if (result?.customerUserErrors?.length) {
      return NextResponse.json(
        { error: result.customerUserErrors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({ customer: result.customer }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Qiftly account creation failed" },
      { status: 500 }
    );
  }
}
