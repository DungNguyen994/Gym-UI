import { gql } from "@apollo/client";

export const GET_MEMBERSHIP_TYPES = gql`
  query Query {
    membershipTypes {
      data {
        discountPercent
        id
        name
        pricePerMonth
      }
      errors {
        message
        pointer
        type
      }
    }
  }
`;
