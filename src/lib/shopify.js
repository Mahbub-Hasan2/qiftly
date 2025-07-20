// src/lib/shopify.js
import axios from 'axios';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const shopifyFetch = async (query, variables = {}) => {
  const URL = `https://${domain}/api/2024-04/graphql.json`;

  try {
    const result = await axios({
      url: URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      data: JSON.stringify({ query, variables }),
    });

    // GraphQL এর error থাকলে সেটাও ধরবে
    if (result.data.errors && result.data.errors.length > 0) {
      const message = result.data.errors.map((e) => e.message).join(', ');
      throw new Error(message);
    }

    if (!result.data.data) {
      throw new Error('No data received from Shopify API');
    }

    return result.data.data;
  } catch (error) {
    console.error('Shopify fetch error:', error.message || error);

    const message =
      error?.message ||
      'দুঃখিত, সার্ভারের সাথে সংযোগে সমস্যা হচ্ছে। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।';

    // মুল error message preserve করে throw করো
    throw new Error(message);
  }
};

export default shopifyFetch;
