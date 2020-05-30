import { gql } from "@apollo/client";
import { POST_PREVIEW, USER_PREVIEW } from "./fragments";

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      ...UserPreview
    }
  }
  ${USER_PREVIEW}
`;

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      ...UserPreview
    }
  }
  ${USER_PREVIEW}
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostPreview
      user {
        ...UserPreview
      }
    }
  }
  ${POST_PREVIEW}
  ${USER_PREVIEW}
`;

export const ACCEPT_REQUEST = gql`
  mutation AcceptInvitation($id: ID!) {
    acceptInvitation(id: $id) {
      statusId
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation SendInvitation($id: ID!) {
    sendInvitation(id: $id) {
      statusId
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation RemoveFriendship($id: ID!) {
    removeFriendship(id: $id)
  }
`;

export const REMOVE_REQUEST = gql`
  mutation RemoveRequest($id: ID!) {
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
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
