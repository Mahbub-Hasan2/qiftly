import shopifyFetch from './shopify';
import { ALL_PRODUCTS_QUERY, HERO_SLIDER_METAOBJECT_QUERY } from './queries';

export const getAllProducts = async () => {
  const data = await shopifyFetch(ALL_PRODUCTS_QUERY);
  return data.products.edges.map(({ node }) => node);
};


export const getHeroSlides = async () => {
  const data = await shopifyFetch(HERO_SLIDER_METAOBJECT_QUERY);

  const slides = data.metaobjects.edges.map(({ node }) => {
    const slide = {
      link: node.displayName,
      desktopImg: '',
      mobileImg: '',
    };

    node.fields.forEach(field => {
      if (field.key === 'desktop_image') {
        slide.desktopImg = field.reference?.image?.url || field.value;
      }
      if (field.key === 'mobile_image') {
        slide.mobileImg = field.reference?.image?.url || field.value;
      }
    });

    return slide;
  });

  return slides;
};
