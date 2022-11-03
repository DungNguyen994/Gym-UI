import { gql } from "@apollo/client";

export const LOG_OUT = gql`
  query {
    logout {
      data
      errors {
        message
      }
    }
  }
`;
