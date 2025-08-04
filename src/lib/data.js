import shopifyFetch from './shopify';
import {
  ALL_PRODUCTS_QUERY,
  HERO_SLIDER_METAOBJECT_QUERY,
  ALL_COLLECTIONS_QUERY,
  COLLECTION_BY_HANDLE_QUERY,
  PRODUCTS_BY_NEW_ARRIVALS_QUERY,
  OccasionTabs_METAOBJECT_QUERY,
  PRODUCT_QUERY,
  NAVIGATION_QUERY,
  CREATE_CUSTOMER_MUTATION, CUSTOMER_ACCESS_TOKEN_CREATE
} from './queries';

/**
 * Fetch all products
 */
export const getAllProducts = async () => {
  try {
    const data = await shopifyFetch(ALL_PRODUCTS_QUERY);
    if (!data?.products?.edges) {
      throw new Error('Invalid response structure for products');
    }
    return { products: data.products.edges.map(({ node }) => node) };
  } catch (error) {
    console.error('Error fetching all products:', error.message || error);
    return { products: [], error: error.message || 'Unknown error' };
  }
};



/**
 * Fetch all collections for category display
 */
export const getAllCollections = async () => {
  try {
    const data = await shopifyFetch(ALL_COLLECTIONS_QUERY);
    if (!data?.collections?.edges) {
      throw new Error('Invalid response structure for collections');
    }
    return { collections: data.collections.edges.map(({ node }) => node) };
  } catch (error) {
    console.error('Error fetching all collections:', error.message || error);
    return { collections: [], error: error.message || 'Unknown error' };
  }
};

/**
 * Fetch products by collection handle
 * @param {string} handle - collection handle
 */
export const getProductsByCollection = async (handle) => {
  try {
    const variables = { handle };
    const data = await shopifyFetch(COLLECTION_BY_HANDLE_QUERY, variables);

    if (!data?.collection?.products?.edges) {
      return { products: [] };
    }

    const products = data.collection.products.edges.map(({ node }) => node);
    return {products};
  } catch (error) {
    console.error(`Error fetching products for collection "${handle}":`, error.message || error);
    return { products: [], error: error.message || 'Unknown error' };
  }
};


/**
 * Fetch Hero Slider slides from metaobjects
 */
export const getHeroSlides = async () => {
  try {
    const data = await shopifyFetch(HERO_SLIDER_METAOBJECT_QUERY);
    if (!data?.metaobjects?.edges) {
      throw new Error('Invalid response structure for hero slides');
    }

    const slides = data.metaobjects.edges.map(({ node }) => {
      const slide = {
        link: '',
        desktopImg: '',
        mobileImg: '',
      };

      node.fields.forEach((field) => {
        if (field.key === 'desktop_image') {
          slide.desktopImg = field.reference?.image?.url || field.value || '';
        }
        if (field.key === 'mobile_image') {
          slide.mobileImg = field.reference?.image?.url || field.value || '';
        }
        if (field.key === 'title') {
          slide.link = field.reference?.image?.title || field.value || '';
        }
      });

      return slide;
    });

    return { slides };
  } catch (error) {
    console.error('Error fetching hero slides:', error.message || error);
    return { slides: [], error: error.message || 'Unknown error' };
  }
};



/**
 * Fetch Occasion Tabs from metaobjects
 */
export const getOccasionTabs = async () => {
  try {
    const data = await shopifyFetch(OccasionTabs_METAOBJECT_QUERY);

    const edges = data?.metaobjects?.edges || [];

    if (!edges.length) {
      throw new Error("No occasion tabs found");
    }

    const tabsData = edges.map(({ node }) => {
      const tab = {
        link: node.displayName || "",
        img: "",
        tabs_name: "",
        collections: "",
      };

      node.fields?.forEach((field) => {
        switch (field.key) {
          case "img":
            // যদি reference থেকে image.url পাওয়া যায়
            tab.img = field.reference?.image?.url || field.value || "";
            break;
          case "tab_name":
            tab.tabs_name = field.value || "";
            break;
          case "collections":
            tab.collections = field.value || "";
            break;
        }
      });
      return tab;
    });
    return { tabsData };
  } catch (error) {
    console.error("Error fetching occasion tabs:", error.message || error);
    return {
      tabsData: [],
      error: error.message || "Unknown error occurred",
    };
  }
};


/**
 * 👉 product details
 */

// lib/data.js
export async function getProductByHandle(handle) {
  try {
    const variables = { handle };
    const data = await shopifyFetch(PRODUCT_QUERY, variables);

    if (!data?.product) {
      return null;
    }

    return data.product;
  } catch (error) {
    console.error("Error fetching product by handle:", error.message || error);
    return null;
  }
}



export const getNavigationMenu = async () => {
  try {
    const data = await shopifyFetch(NAVIGATION_QUERY);
    const menu = data?.menu;

    if (!menu || !menu.items) return [];

    const menuItems = menu.items.map((item) => ({
      id: item.id,
      label: item.title,
      url: item.url,
      type: item.type,
      tags: item.tags || [],
      children: item.items?.map((child) => ({
        id: child.id,
        label: child.title,
        url: child.url,
        type: child.type,
        tags: child.tags || [],
      })) || [],
    }));

    return menuItems;
  } catch (err) {
    console.error("Failed to fetch navigation menu:", err.message || err);
    return [];
  }
};


export const searchProducts = async (searchTerm) => {
  try {
    const cleanQuery = searchTerm.trim().replace(/"/g, '');
    const encoded = `title:*${cleanQuery}* OR tags:*${cleanQuery}* OR vendor:*${cleanQuery}*`;

    const query = `
      {
        products(first: 10, query: "${encoded}") {
          edges {
            node {
              id
              title
              handle
              tags
              vendor
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `;

    const data = await shopifyFetch(query);
    const products = data.products.edges.map(({ node }) => node);
    return products.map((p) => ({
      id: p.id,
      title: p.title,
      handle: p.handle,
      tags: p.tags || [],
      vendor: p.vendor || '',
      image: p.images.edges[0]?.node.url || '',
      price: p.priceRange.minVariantPrice.amount,
      currency: p.priceRange.minVariantPrice.currencyCode,
    }));
  } catch (err) {
    console.error('Search failed:', err.message || err);
    return [];
  }
};


// lib/data.js
// lib/data.js

export const createCustomerAccount = async ({ firstName, lastName, email, password }) => {
  const input = {
    firstName,
    lastName,
    email,
    password,
  };

  const result = await shopifyFetch(CREATE_CUSTOMER_MUTATION, { input });

  if (result?.customerCreate?.customerUserErrors?.length > 0) {
    throw new Error(result.customerCreate.customerUserErrors[0].message);
  }

  return result?.customerCreate;
};

export const generateCustomerAccessToken = async ({ email, password }) => {
  const input = { email, password };

  const result = await shopifyFetch(CUSTOMER_ACCESS_TOKEN_CREATE, { input });

  if (result?.customerAccessTokenCreate?.customerUserErrors?.length > 0) {
    throw new Error(result.customerAccessTokenCreate.customerUserErrors[0].message);
  }

  return result?.customerAccessTokenCreate;
};