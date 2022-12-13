import { gql } from "@apollo/client";

export const ACTIVATE_MEMBERSHIP = gql`
  mutation ($memberId: ID!, $startDate: String!) {
    activateMembership(memberId: $memberId, startDate: $startDate) {
      data
      errors {
        message
        pointer
        type
      }
    }
  }
`;
