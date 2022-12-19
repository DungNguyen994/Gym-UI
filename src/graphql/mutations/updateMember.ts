import { gql } from "@apollo/client";

export const UPDATE_MEMBER = gql`
  mutation (
    $id: ID!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $birthDate: String
    $email: String
    $address: String
    $note: String
    $gender: String
    $photo: String
    $newMembership: NewMembership
    $payment: NewPayment
  ) {
    updateMember(
      id: $id
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      birthDate: $birthDate
      email: $email
      address: $address
      note: $note
      gender: $gender
      photo: $photo
      newMembership: $newMembership
      payment: $payment
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
