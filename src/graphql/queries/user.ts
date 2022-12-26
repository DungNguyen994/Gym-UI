import { gql } from "@apollo/client";

export const GET_USER = gql`
  query ($username: String!) {
    user(username: $username) {
      data {
        id
        photo
        email
        phoneNumber
        username
        firstName
        lastName
      }
      errors {
        message
        pointer
        type
      }
    }
  }
`;
