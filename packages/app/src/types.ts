import { Status } from "./enums";
export interface UserData {
  user: UserProfile;
}

export interface UserProfile extends UserPreview {
  background: string;
  posts: Post[];
  friends: UserPreview[];
  friendshipStatus: FriendshipStatus;
}

export interface FriendStatus {
  fromUserId: string;
  status: Status;
}

export interface UserVars {
  id: string;
}

export interface MessageReceivedData {
  messageReceived: Message;
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

export interface PostsData {
  posts: {
    __typename: "posts";
    edges: Post[];
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

export interface LikesInfo {
  likes: number;
  isLiked: boolean;
}

export interface CommentsInfo {
  comments: number;
}

export interface CommentsData {
  comments: Comment[];
}

export interface Comment {
  id: string;
  createdAt: Date;
  content: string;
  user: UserPreview;
}

export interface Post {
  id: string;
  content: string;
  createdAt: Date;
  likesInfo: LikesInfo;
  commentsInfo: CommentsInfo;
  user: UserPreview;
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
