import { gql } from "@apollo/client";

export const HOLD_MEMBERSHIP = gql`
  mutation ($id: ID!) {
    holdMembership(id: $id) {
      data
      errors {
        message
        pointer
        type
      }
    }
  }
`;
