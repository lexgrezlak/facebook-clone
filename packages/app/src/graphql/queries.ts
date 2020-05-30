import { gql } from "@apollo/client";
import { POST_PREVIEW, USER_PREVIEW } from "./fragments";

export const GET_ME = gql`
  query Me {
    me {
      ...UserPreview
    }
  }
  ${USER_PREVIEW}
`;

export const GET_FEED = gql`
  query Feed($cursor: Float) {
    feed(cursor: $cursor) {
      edges {
        ...PostPreview
        user {
          ...UserPreview
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${USER_PREVIEW}
  ${POST_PREVIEW}
`;

export const GET_PROFILE_FEED = gql`
  query ProfileFeed($id: ID!) {
    profileFeed(id: $id) {
      ...PostPreview
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

export const GET_FRIEND_REQUESTS = gql`
  query FriendRequests {
    friendRequests {
      id
      sentTime
      sender {
        ...UserPreview
      }
    }
  }
  ${USER_PREVIEW}
`;

export const GET_FRIENDS = gql`
  query Friends($id: ID!) {
    friends(id: $id) {
      ...UserPreview
    }
  }
  ${USER_PREVIEW}
`;

export const GET_USER = gql`
  query User($id: ID!) {
    user(where: { id: $id }) {
      background
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
  query FriendStatus($id: ID!) {
    friendStatus(id: $id) {
      fromUserId
      statusId
    }
  }
`;
