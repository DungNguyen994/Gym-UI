import { gql } from "@apollo/client";

export const UPDATE_PASSWORD = gql`
  mutation Mutation($password: String!, $id: ID!, $currentPassword: String!) {
    changePassword(
      password: $password
      id: $id
      currentPassword: $currentPassword
    ) {
      data
      errors {
        message
        pointer
        type
      }
    }
  }
`;
