import { gql } from "@apollo/client";

export const ADD_MEMBERSHIP_TYPE = gql`
  mutation Mutation(
    $name: String!
    $pricePerMonth: Float!
    $discountPercent: Float!
  ) {
    addMembershipType(
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
