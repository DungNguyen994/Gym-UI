import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query ($productId: ID!) {
    product(id: $productId) {
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
