import { gql } from "@apollo/client";

export const STOCK_IN = gql`
  mutation StockIn($productId: String!, $quantity: Int!) {
    stockIn(productId: $productId, quantity: $quantity) {
      data
      errors {
        message
        pointer
        type
      }
    }
  }
`;
