export interface UserData {
  user: UserPreviewAndPosts;
}

export interface UserVars {
  id: number;
}

export enum IsFriend {
  IsNot,
  Is,
  MeSentRequest,
  MeReceivedRequest,
}

export interface FeedData {
  feed: {
    __typename: "feed";
    edges: PostAndAuthor[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: number;
    };
  };
}

export interface UserPreview {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface Post {
  id: number;
  content: string;
  createdAt: Date;
}

export interface PostAndAuthor extends Post {
  author: UserPreview;
}

export interface UserPreviewAndPosts extends UserPreview {
  background: string;
  posts: Post[];
}

export interface FriendRequest {
  id: number;
  sender: UserPreview;
  sentTime: Date;
}

export interface FriendRequestsData {
  friendRequests: FriendRequest[];
}

export interface MeData {
  me: UserPreview;
}
