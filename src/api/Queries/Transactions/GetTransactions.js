import { gql } from "@apollo/client";
import React from "react";
import Query from "../../../components/Query";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    getTransactions {
      getTransactionsStatus
      transactions {
        transactionId
        recipientEmail
        recipientPhoneNumber
        amount
        currency
        timestamp
      }
    }
  }
`;

const GetTransactionsQuery = ({ ...rest }) => {
  return <Query query={GET_TRANSACTIONS} {...rest} />;
};

export default GetTransactionsQuery;
