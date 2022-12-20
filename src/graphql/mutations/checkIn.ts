import { gql } from "@apollo/client";

export const CHECK_IN = gql`
  mutation Mutation($memberId: ID!) {
    checkIn(memberId: $memberId) {
      data
      errors {
        message
        pointer
        type
      }
    }
  }
`;
