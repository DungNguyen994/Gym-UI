import { gql } from "@apollo/client";

export const UPDATE_PRODUCT = gql`
  mutation Mutation(
    $id: ID!
    $productType: String!
    $productName: String!
    $unitPrice: Float!
    $discountPercent: Float!
    $photo: String
    $supplier: String
  ) {
    updateProduct(
      id: $id
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
        pointer
        type
      }
    }
  }
`;
