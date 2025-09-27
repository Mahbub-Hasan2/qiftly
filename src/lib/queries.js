// lib/queries.js

export const ALL_PRODUCTS_QUERY = `{
  products(first: 10) {
      edges {
        node {
          id
          title
          handle
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
            
variants(first: 1) {
          edges {
            node {
              id
              title
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
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  image {
                    originalSrc
                    altText
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;



export const HERO_SLIDER_METAOBJECT_QUERY = `{
  metaobjects(first: 5, type: "home_slider_ben") {
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


export const PRODUCT_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      tags
      images(first: 5) {
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
      availableForSale
      totalInventory
      variants(first: 10) {
        edges {
          node {
            id
            title
            sku
            weight
            weightUnit
            availableForSale
            quantityAvailable
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;



export const NAVIGATION_QUERY = `
query GetMainMenu {
  menu(handle: "main-menu") {
    title
    items {
      id
      title
      url
      type
      tags
      items {
        id
        title
        url
        type
        tags
      }
    }
  }
}

`;


export const SEARCH_PRODUCTS_QUERY = `{
  products(first: 10, query: "") {
      edges {
        node {
          id
          title
          handle
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
`;



// lib/queries.js

export const CREATE_CUSTOMER_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        firstName
        lastName
        email
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;


// lib/queries.js
// lib/queries.js
export const CHECKOUT_CREATE_MUTATION = `
mutation checkoutCreate($input: CheckoutCreateInput!) {
  checkoutCreate(input: $input) {
    checkout {
      id
      webUrl
    }
    checkoutUserErrors {
      field
      message
    }
  }
}
`;

// এটা কাস্টমার থেকে একেবারে সব ইনফরমেশন সহ নেওয়া হচ্ছে । 
// export const CHECKOUT_CREATE_MUTATION = `
// mutation checkoutCreate($input: CheckoutCreateInput!) {
//   checkoutCreate(input: $input) {
//     checkout {
//       id
//       webUrl
//       lineItems(first: 10) {
//         edges {
//           node {
//             title
//             quantity
//           }
//         }
//       }
//       shippingAddress {
//         firstName
//         lastName
//         address1
//         city
//         country
//         phone
//       }
//     }
//     checkoutUserErrors {
//       field
//       message
//     }
//   }
// }
// `;



// lib/queries.js
export const CREATE_DRAFT_ORDER_MUTATION = `
  mutation draftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        id
        name
        invoiceUrl
        status
      }
      userErrors {
        field
        message
      }
    }
  }
`;

