import { gql } from "@apollo/client";

export const REFRESH_TOKEN = gql`
  query {
    refreshToken {
      data
      errors {
        message
      }
    }
  }
`;
