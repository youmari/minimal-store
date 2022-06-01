import { gql } from '@apollo/client';

export const queryGenerator = (category = 'all') => {
  const GET_CATEGORY_PRODUCTS = gql`
      query GetProducts {
        category(input: { title: "${category}" }) {
          name
          products {
            id
            name
            gallery
            inStock
            prices {
              currency {
                symbol
              }
              amount
            }
            attributes {
              id
              name
              type
              items {
                id
                value
              }
            }
          }
        }
      }
  `;
  return GET_CATEGORY_PRODUCTS;
};

export const getProduct = (productId) => {
  const GET_PRODUCT = gql`
    query getProduct {
      product(id: "${productId}") {
        id
        name
        brand
        gallery
        inStock
        description
        prices {
          currency {
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            id
            value
          }
        }
      
      }
    }
  `;
  return GET_PRODUCT;
};
