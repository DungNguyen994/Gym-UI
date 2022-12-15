import { gql } from "@apollo/client";

export const GET_INVENTORY = gql`
  query {
    inventory {
      data {
        id
        productId
        productName
        productType
        quantity
        supplier
        photo
        unitPrice
        discountPercent
      }
      errors {
        message
        pointer
        type
      }
    }
  }
`;
