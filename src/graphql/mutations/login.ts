import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      data
      errors {
        pointer
        message
      }
    }
  }
`;
