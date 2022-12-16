import { gql } from "@apollo/client";

export const ADD_PAYMENT = gql`
  mutation Mutation(
    $paymentMethod: String!
    $memberId: String
    $total: Float!
    $change: Float
    $collected: Float
    $products: [ProductInput]!
  ) {
    addPayment(
      paymentMethod: $paymentMethod
      memberId: $memberId
      total: $total
      change: $change
      collected: $collected
      products: $products
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
