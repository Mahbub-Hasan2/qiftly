import { shopifyFetch } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { firstName, lastName, email, password } = await req.json();

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

  try {
    const data = await shopifyFetch(query, { input: { firstName, lastName, email, password } });
    const result = data.customerCreate;

    if (result.customerUserErrors.length) {
      return NextResponse.json({ error: result.customerUserErrors[0].message }, { status: 400 });
    }

    return NextResponse.json({ customer: result.customer });
  } catch (err) {
    return NextResponse.json({ error: "Account creation failed" }, { status: 500 });
  }
}
