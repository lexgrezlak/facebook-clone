import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query AllUsers {
    allUsers {
      email
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $birthday: DateTime!
    $gender: Gender!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      birthday: $birthday
      gender: $gender
    ) {
      firstName
      lastName
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      firstName
      lastName
      email
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      firstName
      lastName
      email
    }
  }
`;

export const GET_FEED = gql`
  query Feed {
    feed {
      id
      content
      author {
        id
        firstName
        lastName
      }
      createdAt
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($content: String!) {
    createPost(content: $content) {
      id
      content
      author {
        firstName
        lastName
      }
      createdAt
    }
  }
`;

export const GET_USERS = gql`
  query Users($filter: String!) {
    users(filter: $filter) {
      id
      firstName
      lastName
    }
  }
`;

export const SEND_INVITATION = gql`
  mutation SendInvitation($id: Int!) {
    sendInvitation(id: $id) {
      statusId
    }
  }
`;

export const ACCEPT_INVITATION = gql`
  mutation AcceptInvitation($id: Int!) {
    acceptInvitation(id: $id) {
      statusId
    }
  }
`;

export const GET_INVITATIONS = gql`
  query Invitations {
    invitations {
      id
      fromUserId
      toUserId
      statusId
    }
  }
`;

export const GET_FRIENDS = gql`
  query Friends($id: Int) {
    friends(id: $id) {
      id
      firstName
      lastName
    }
  }
`;
