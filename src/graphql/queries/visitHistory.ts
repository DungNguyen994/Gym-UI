import { gql } from "@apollo/client";

export const VISIT_HISTORY = gql`
  query Query {
    visitHistory {
      data {
        date
        id
        memberId
        memberName
      }
      errors {
        message
        pointer
        type
      }
    }
  }
`;
