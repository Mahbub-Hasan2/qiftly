import axios from 'axios';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const shopifyFetch = async (query) => {
  const URL = `https://${domain}/api/2024-04/graphql.json`;

  const result = await axios({
    url: URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    data: JSON.stringify({ query }),
  });

  return result.data.data;
};

export const getAllProducts = async () => {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(query);
  return data.products.edges.map(({ node }) => node);
};
