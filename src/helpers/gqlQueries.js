import { gql } from "@apollo/client";

export const categoriesQuery = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

export const currenciesQuery = gql`
  query GetCurrenies {
    currencies {
      label
      symbol
    }
  }
`;

export const productsByCategoryQuery = gql`
  query GetProductsByCategory($categoryName: String!) {
    category(input: { title: $categoryName }) {
      products {
        id
        name
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        gallery
        inStock
      }
    }
  }
`;

export const productQuery = gql`
  query GetProduct($productId: String!) {
    product(id: $productId) {
      id
      brand
      name
      inStock
      gallery
      description
      attributes {
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;
