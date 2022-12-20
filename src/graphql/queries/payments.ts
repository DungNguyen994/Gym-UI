import { gql } from "@apollo/client";

export const PAYMENTS = gql`
  query Payments {
    payments {
      data {
        change
        collected
        createdAt
        id
        memberId
        memberName
        paymentMethod
        membershipType
        products {
          buyQuantity
          discountPercent
          productId
          inventoryId
          photo
          productType
          productName
          supplier
          unitPrice
        }
        term
        total
      }
      errors {
        message
        pointer
        type
      }
    }
  }
`;
