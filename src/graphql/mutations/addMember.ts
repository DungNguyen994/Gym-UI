import { gql } from "@apollo/client";

export const ADD_MEMBER = gql`
  mutation (
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $payment: NewPayment!
    $membership: NewMembership!
    $birthDate: String
    $email: String
    $address: String
    $note: String
    $gender: String
    $photo: String
  ) {
    addMember(
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      payment: $payment
      membership: $membership
      birthDate: $birthDate
      email: $email
      address: $address
      note: $note
      gender: $gender
      photo: $photo
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
