import { gql } from "@apollo/client";

export const ADD_MEMBER = gql`
  mutation AddMember(
    $gender: String
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $birthDate: String
    $email: String
    $address: String
    $payment: PaymentInput!
    $startDate: String!
    $endDate: String!
    $notes: [NoteInput]
    $photo: String
  ) {
    addMember(
      gender: $gender
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      birthDate: $birthDate
      email: $email
      address: $address
      payment: $payment
      startDate: $startDate
      endDate: $endDate
      notes: $notes
      photo: $photo
    ) {
      data
      errors {
        message
        pointer
      }
    }
  }
`;
