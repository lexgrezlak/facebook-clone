import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query AllUsers {
    allUsers {
      email
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      email
    }
  }
`;
