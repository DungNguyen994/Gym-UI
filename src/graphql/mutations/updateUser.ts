import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation Mutation(
    $firstName: String!
    $lastName: String!
    $phoneNumber: String
    $email: String
    $photo: String
    $id: ID!
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      email: $email
      photo: $photo
      id: $id
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
