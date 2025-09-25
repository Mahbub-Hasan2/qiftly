// lib/shopify.js
import axios from "axios";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN; // 🔑 Admin API token

const SHOP_URL = `https://${domain}/api/2024-10/graphql.json`;

// ---------------- Storefront API Fetch ----------------
async function shopifyFetch(query, variables = {}) {
  const URL = `https://${domain}/api/2024-04/graphql.json`;

  try {
    const result = await axios({
      url: URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      data: JSON.stringify({ query, variables }),
    });

    if (result.data.errors?.length > 0) {
      const message = result.data.errors.map((e) => e.message).join(", ");
      throw new Error(message);
    }

    if (!result.data.data) {
      throw new Error("No data received from Shopify Storefront API");
    }

    return result.data.data;
  } catch (error) {
    console.error("Shopify Storefront fetch error:", error.message || error);
    throw new Error(error?.message || "সার্ভারের সাথে সংযোগে সমস্যা হচ্ছে।");
  }
}

// ---------------- Admin API Fetch ----------------
async function shopifyAdminFetch(query, variables = {}) {
  const URL = `https://${domain}/admin/api/2024-04/graphql.json`;

  try {
    const result = await axios({
      url: URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": adminAccessToken,
      },
      data: JSON.stringify({ query, variables }),
    });

    if (result.data.errors?.length > 0) {
      const message = result.data.errors.map((e) => e.message).join(", ");
      throw new Error(message);
    }

    if (!result.data.data) {
      throw new Error("No data received from Shopify Admin API");
    }

    return result.data.data;
  } catch (error) {
    console.error("Shopify Admin fetch error:", error.message || error);
    throw new Error(error?.message || "Shopify Admin API তে সমস্যা হচ্ছে।");
  }
}

// ---------------- Customer APIs ----------------

/** Create customer */
async function createCustomer(input) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;
  const data = await shopifyFetch(query, { input });
  return data.customerCreate;
}

/** Create access token (login) */
async function createCustomerAccessToken(email, password) {
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
  const data = await shopifyFetch(query, { input: { email, password } });
  return data.customerAccessTokenCreate;
}

/** Get customer by token */
async function getCustomerByToken(customerAccessToken) {
  const query = `
    query customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        email
        firstName
        lastName
      }
    }
  `;

  const resp = await axios.post(
    SHOP_URL,
    {
      query,
      variables: { customerAccessToken },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
    }
  );

  return resp.data.data?.customer ?? null;
}

// ✅ Final Export (No Duplicates)
export {
  shopifyFetch,
  shopifyAdminFetch,
  createCustomer,
  createCustomerAccessToken,
  getCustomerByToken,
};
