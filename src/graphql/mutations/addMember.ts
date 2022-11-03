import { gql } from "@apollo/client";

export const ADD_MEMBER = gql`
  mutation (
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $term: String!
    $membershipType: String!
    $amount: String!
    $startDate: String!
    $endDate: String!
    $dateOfBirth: String
    $email: String
    $address: String
    $note: String
    $gender: String
    $photo: String
    $paymentType: String!
  ) {
    addMember(
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      term: $term
      membershipType: $membershipType
      amount: $amount
      startDate: $startDate
      endDate: $endDate
      dateOfBirth: $dateOfBirth
      email: $email
      address: $address
      note: $note
      gender: $gender
      photo: $photo
      paymentType: $paymentType
    ) {
      data
      errors {
        message
        type
        pointer
      }
    }
  }
`;
