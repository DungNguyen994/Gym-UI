import { gql } from "@apollo/client";

export const DELELE_PRODUCT = gql`
  mutation ($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId) {
      data
      errors {
        message
        pointer
        type
      }
    }
  }
`;
