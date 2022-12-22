import { gql } from "@apollo/client";

export const UPDATE_MEMBERSHIP_TYPE = gql`
  mutation Mutation(
    $id: ID!
    $name: String!
    $pricePerMonth: Float!
    $discountPercent: Float!
  ) {
    updateMembershipType(
      id: $id
      name: $name
      pricePerMonth: $pricePerMonth
      discountPercent: $discountPercent
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
