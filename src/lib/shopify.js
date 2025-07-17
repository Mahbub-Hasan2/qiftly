// src/lib/shopify.js

import axios from 'axios';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const shopifyFetch = async (query, variables = {}) => {
  const URL = `https://${domain}/api/2024-04/graphql.json`;

  const result = await axios({
    url: URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    data: JSON.stringify({ query, variables }),
  });

  return result.data.data;
};

export default shopifyFetch;
