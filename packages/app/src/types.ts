export interface UserData {
  user: UserPreviewAndPosts;
}

export interface UserVars {
  id: string;
}

export enum FriendshipStatus {
  STRANGER = "stranger",
  FRIEND = "friend",
  ME_SENT_REQUEST = "me sent request",
  ME_RECEIVED_REQUEST = "me received request",
}

export interface FeedData {
  feed: {
    __typename: "feed";
    edges: PostAndUser[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: number;
    };
  };
}

export interface UserPreview {
  id: string;
  fullName: string;
  avatar: string;
}

export interface Post {
  id: string;
  content: string;
  createdAt: Date;
}

export interface PostAndUser extends Post {
  user: UserPreview;
}

export interface UserPreviewAndPosts extends UserPreview {
  background: string;
  posts: Post[];
}

export interface FriendRequest {
  id: string;
  sentTime: Date;
  fromUser: UserPreview;
}

export interface FriendRequestsData {
  friendRequests: FriendRequest[];
}

export interface MeData {
  me: UserPreview;
}
