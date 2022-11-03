import { gql } from "@apollo/client";

export const GET_MEMBERS = gql`
  query {
    members {
      data {
        _id
        firstName
        lastName
        photo
        phoneNumber
        address
        email
        startDate
        endDate
        birthDate
        membershipType
        term
        gender
      }
      errors {
        message
        pointer
        type
      }
    }
  }
`;
