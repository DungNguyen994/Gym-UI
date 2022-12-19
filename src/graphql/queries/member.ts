import { gql } from "@apollo/client";

export const GET_MEMBER = gql`
  query ($memberId: ID!) {
    member(id: $memberId) {
      data {
        address
        birthDate
        email
        firstName
        gender
        id
        lastName
        memberships {
          endDate
          membershipType
          startDate
          term
          status
          id
        }
        status
        currentMembershipType
        remainingDays
        note
        phoneNumber
        photo
      }
      errors {
        message
        pointer
        type
      }
    }
  }
`;
