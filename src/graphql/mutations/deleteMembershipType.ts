import { gql } from "@apollo/client";

export const DELELE_MEMBERSHIP_TYPE = gql`
  mutation ($id: ID!) {
    deleteMembershipType(id: $id) {
      data
      errors {
        message
        pointer
        type
      }
    }
  }
`;
