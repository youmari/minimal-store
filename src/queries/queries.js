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
            description
            inStock
            prices {
              currency {
                symbol
              }
              amount
            }
            brand
            attributes {
              id
              name
              type
              items {
                value
                id
              }
            }
          }
        }
      }
  `;
  return GET_CATEGORY_PRODUCTS;
};
