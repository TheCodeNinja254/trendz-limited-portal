import { gql } from "@apollo/client";

export const SEND_MONEY = gql`
  mutation SendMoney($input: SendMoneyInput!) {
    sendMoney(input: $input) {
      status
      message
      transactionId
      confirmationCode
      newBalance
      timestamp
    }
  }
`;

export default SEND_MONEY;
