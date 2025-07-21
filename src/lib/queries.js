// lib/queries.js

export const ALL_PRODUCTS_QUERY = `{
  products(first: 10) {
    edges {
      node {
        id
        title
        productType
        tags
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  }
}
`;

export const ALL_COLLECTIONS_QUERY = `{
  collections(first: 10) {
    edges {
      node {
        id
        handle
        title
        image {
          url
          altText
        }
      }
    }
  }
}`;

export const COLLECTION_BY_HANDLE_QUERY = `
  query CollectionByHandle($handle: String!) {
    collection(handle: $handle) {
      title
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
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
  }
`;

export const HERO_SLIDER_METAOBJECT_QUERY = `{
  metaobjects(first: 5, type: "list_of_objects") {
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
              }
            }
          }
        }
      }
    }
  }
}`;
