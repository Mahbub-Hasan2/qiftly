export const ALL_PRODUCTS_QUERY = `
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


export const HERO_SLIDER_METAOBJECT_QUERY = `
query HeroSliderSlides {
  metaobjects(type: "list_of_objects", first: 10) {
    edges {
      node {
        id
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
}
`;
