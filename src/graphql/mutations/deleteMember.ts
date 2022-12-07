import { gql } from "@apollo/client";

export const DELETE_MEMBER = gql`
  mutation ($deleteMemberId: ID!) {
    deleteMember(id: $deleteMemberId) {
      data
      errors {
        message
        pointer
        type
      }
    }
  }
`;
