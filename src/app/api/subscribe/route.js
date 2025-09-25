import { shopifyAdminFetch } from "@/lib/shopify";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const query = `
      mutation newsletterSubscriberCreate($email: String!) {
        newsletterSubscriberCreate(input: {email: $email}) {
          newsletterSubscriber {
            id
            email
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const data = await shopifyAdminFetch(query, { email });
console.log('data', data)
    if (!data) {
      return res.status(500).json({ error: "Empty response from Shopify" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
