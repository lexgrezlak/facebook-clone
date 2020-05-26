import { gql } from "@apollo/client";

const USER_PREVIEW = gql`
  fragment UserPreview on User {
    id
    firstName
    lastName
    avatar
  }
`;

const POST_PREVIEW = gql`
  fragment PostPreview on Post {
    id
    content
    createdAt
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
      ...UserPreview
    }
  }
  ${USER_PREVIEW}
`;

export const GET_FEED = gql`
  query Feed {
    feed {
      ...PostPreview
      author {
        ...UserPreview
      }
    }
  }
  ${USER_PREVIEW}
  ${POST_PREVIEW}
`;

export const GET_PROFILE_FEED = gql`
  query ProfileFeed($id: Int!) {
    profileFeed(id: $id) {
      ...PostPreview
    }
  }
  ${POST_PREVIEW}
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
    }
  }
`;

export const GET_FRIENDS = gql`
  query Friends($id: Int) {
    friends(id: $id) {
      ...UserPreview
    }
  }
  ${USER_PREVIEW}
`;

export const GET_USER = gql`
  query User($id: Int!) {
    user(where: { id: $id }) {
      ...UserPreview
      posts {
        id
        content
        createdAt
      }
    }
  }
  ${USER_PREVIEW}
`;

export const GET_FRIEND_STATUS = gql`
  query FriendStatus($id: Int!) {
    friendStatus(id: $id) {
      fromUserId
      statusId
    }
  }
`;

export const REMOVE_FRIENDSHIP = gql`
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

export const DELETE_POST = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`;
