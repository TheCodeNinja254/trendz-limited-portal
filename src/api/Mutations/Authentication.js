import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      status
      message
      firstName
      lastName
      phoneNumber
      emailAddress
      lastLogin
      accountInfo {
        accountBalance
        accountPrimaryCurrency
        accountStatus
      }
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      status
      message
      username
      emailAddress
      firstName
      lastName
      phoneNumber
      accountBalance
    }
  }
`;
