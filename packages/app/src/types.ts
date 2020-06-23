export interface UserData {
  user: UserPreviewAndPosts;
}

export interface UserVars {
  id: string;
}

export enum FriendshipStatus {
  Stranger = "STRANGER",
  Friend = "FRIEND",
  MeSentRequest = "ME_SENT_REQUEST",
  MeReceivedRequest = "ME_RECEIVED_REQUEST",
}

export interface MessagePreview {
  id: string;
  content: string;
}

export interface LikesOfPostData {
  likesOfPost: number;
}

export interface Notification {
  id: string;
  message: string;
  receivedAt: Date;
  link: string;
}

export interface ChatPreview {
  id: string;
  users: UserPreview[];
  lastMessage: Message;
  unread: Boolean;
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

export interface ChatsData {
  chats: ChatPreview[];
}

export interface Message {
  id: string;
  content: string;
  sentTime: Date;
  user: UserPreview;
  chatId: string;
}

export interface Chat {
  id: string;
  messages: Message[];
  users: UserPreview[];
}

export interface ChatData {
  chat: Chat;
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
