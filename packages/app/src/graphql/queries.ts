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

export const GET_CHAT = gql`
  query Chat($id: String!) {
    chat(id: $id) {
      id
      messages {
        id
        content
        sentTime
        user {
          ...UserPreview
        }
      }
      users {
        ...UserPreview
      }
    }
  }
  ${USER_PREVIEW}
`;

export const GET_CHATS = gql`
  query Chats {
    chats {
      id
      users {
        ...UserPreview
      }
      lastMessage {
        content
      }
    }
  }
  ${USER_PREVIEW}
`;

export const GET_LIKES_OF_POST = gql`
  query LikesOfPost($postId: String!) {
    likesOfPost(postId: $postId)
  }
`;

export const GET_IS_POST_LIKED = gql`
  query IsPostLiked($postId: String!) {
    isPostLiked(postId: $postId)
  }
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
  query Users($input: UsersInput!) {
    users(input: $input) {
      ...UserPreview
    }
  }
  ${USER_PREVIEW}
`;

export const GET_FRIEND_REQUESTS = gql`
  query FriendRequests {
    friendRequests {
      id
      sentTime
      fromUser {
        ...UserPreview
      }
    }
  }
  ${USER_PREVIEW}
`;

export const GET_FRIENDS = gql`
  query Friends($userId: String!) {
    friends(userId: $userId) {
      ...UserPreview
    }
  }
  ${USER_PREVIEW}
`;

export const GET_USER = gql`
  query User($id: String!) {
    user(id: $id) {
      background
      ...UserPreview
      posts {
        ...PostPreview
      }
    }
  }
  ${USER_PREVIEW}
  ${POST_PREVIEW}
`;

export const GET_FRIEND_STATUS = gql`
  query FriendStatus($userId: String!) {
    friendStatus(userId: $userId) {
      fromUserId
      status
    }
  }
`;
