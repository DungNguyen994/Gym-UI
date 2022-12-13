import { gql } from "@apollo/client";

export const HOLD_MEMBERSHIP = gql`
  mutation ($memberId: ID!, $startDate: String!) {
    holdMembership(memberId: $memberId, startDate: $startDate) {
      data
      errors {
        message
        pointer
        type
      }
    }
  }
`;
