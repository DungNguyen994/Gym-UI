import { gql } from "@apollo/client";

export const GET_MEMBERS = gql`
  query {
    members {
      data {
        id
        firstName
        lastName
        phoneNumber
        photo
        memberships {
          endDate
          membershipType
          startDate
          status
        }
      }
      errors {
        message
        pointer
        type
      }
    }
  }
`;
