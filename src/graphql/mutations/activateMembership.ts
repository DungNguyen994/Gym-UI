import { gql } from "@apollo/client";

export const ACTIVATE_MEMBERSHIP = gql`
  mutation ($id: ID!, $memberId: ID!) {
    activateMembership(id: $id, memberId: $memberId) {
      data
      errors {
        message
        pointer
        type
      }
    }
  }
`;
