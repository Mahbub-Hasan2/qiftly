// lib/queries.js

export const ALL_PRODUCTS_QUERY = `{
  products(first: 10) {
    edges {
      node {
        id
        title
        handle
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
          tags
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

export const OccasionTabs_METAOBJECT_QUERY = `{
  metaobjects(first: 5, type: "gifts_for_every_occasion_tabs") {
    edges {
      node {
        id
        type
        
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



// lib/queries.js

export const getCollectionWithProductsQuery = `
  query getCollection($handle: String!) {
    collectionByHandle(handle: $handle) {
      title
      description
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              altText
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
