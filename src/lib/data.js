import shopifyFetch from './shopify';
import {
  ALL_PRODUCTS_QUERY,
  HERO_SLIDER_METAOBJECT_QUERY,
  ALL_COLLECTIONS_QUERY,
  COLLECTION_BY_HANDLE_QUERY,
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

    return { products: data.collection.products.edges.map(({ node }) => node) };
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
        link: node.displayName || '',
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
      });

      return slide;
    });

    return { slides };
  } catch (error) {
    console.error('Error fetching hero slides:', error.message || error);
    return { slides: [], error: error.message || 'Unknown error' };
  }
};
