import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    products {
      data {
        discountPercent
        id
        photo
        productName
        productType
        supplier
        unitPrice
      }
      errors {
        message
        pointer
        type
      }
    }
  }
`;
