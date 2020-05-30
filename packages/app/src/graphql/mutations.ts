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
  mutation AcceptRequest($userId: String!) {
    acceptRequest(userId: $userId)
  }
`;

export const SEND_REQUEST = gql`
  mutation SendRequest($userId: String!) {
    sendRequest(userId: $userId)
  }
`;

export const UNFRIEND = gql`
  mutation Unfriend($userId: String!) {
    unfriend(userId: $userId)
  }
`;

export const CANCEL_REQUEST = gql`
  mutation CancelRequest($userId: String!) {
    cancelRequest(userId: $userId)
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
  mutation DeletePost($id: String!) {
    deletePost(id: $id)
  }
`;
