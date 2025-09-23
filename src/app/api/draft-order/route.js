// src/app/api/draft-order/route.js
import { createDraftOrder } from "@/lib/data";

export async function POST(req) {
  try {
    const { cartItems, address, email } = await req.json();

    if (!cartItems || !address) {
      return new Response(JSON.stringify({ message: "Cart items and address are required" }), { status: 400 });
    }

    const draftOrder = await createDraftOrder(cartItems, address, email);

    return new Response(JSON.stringify({ draftOrder }), { status: 200 });
  } catch (err) {
    console.error("API draft-order error:", err.message);
    return new Response(JSON.stringify({ message: err.message || "Something went wrong" }), { status: 500 });
  }
}
