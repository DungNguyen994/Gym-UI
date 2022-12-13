import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation (
    $productType: String!
    $productName: String!
    $unitPrice: Float!
    $discountPercent: Float!
    $photo: String
    $supplier: String
  ) {
    addProduct(
      productType: $productType
      productName: $productName
      unitPrice: $unitPrice
      discountPercent: $discountPercent
      photo: $photo
      supplier: $supplier
    ) {
      data
      errors {
        message
        type
        pointer
      }
    }
  }
`;
