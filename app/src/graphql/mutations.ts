import { gql } from "@apollo/client";
import { POST_PREVIEW } from "./fragments";

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
      id
      firstName
      lastName
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      firstName
      lastName
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($content: String!) {
    createPost(content: $content) {
      ...PostPreview
      author {
        firstName
        lastName
      }
    }
  }
  ${POST_PREVIEW}
`;

export const ACCEPT_REQUEST = gql`
  mutation AcceptInvitation($id: Int!) {
    acceptInvitation(id: $id) {
      statusId
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation SendInvitation($id: Int!) {
    sendInvitation(id: $id) {
      statusId
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation RemoveFriendship($id: Int!) {
    removeFriendship(id: $id)
  }
`;

export const REMOVE_REQUEST = gql`
  mutation RemoveRequest($id: Int!) {
    removeRequest(id: $id)
  }
`;

export const UPDATE_AVATAR = gql`
  mutation UpdateAvatar($file: Upload!) {
    updateAvatar(file: $file) {
      url
    }
  }
`;

export const UPDATE_BACKGROUND = gql`
  mutation UpdateBackground($file: Upload!) {
    updateBackground(file: $file) {
      url
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`;
