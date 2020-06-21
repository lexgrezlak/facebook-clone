import { CreateMessageResolver } from "./resolvers/message/CreateMessage";
import { ChatCreatedResolver } from "./resolvers/ChatCreated";
import { ChatsResolver } from "./resolvers/chat/Chats";
import { ChatResolver } from "./resolvers/chat/Chat";
import { CreateChatResolver } from "./resolvers/chat/CreateChat";
import { MessageReceivedResolver } from "./resolvers/MessageReceived";
import { UpdateAvatarResolver } from "./resolvers/user/UpdateAvatar";
import { UpdateBackgroundResolver } from "./resolvers/user/UpdateBackground";
import { RejectRequestResolver } from "./resolvers/friend/RejectRequest";
import { AcceptRequestResolver } from "./resolvers/friend/AcceptRequest";
import { UnfriendResolver } from "./resolvers/friend/Unfriend";
import { CancelRequestResolver } from "./resolvers/friend/CancelRequest";
import { SendRequestResolver } from "./resolvers/friend/SendRequest";
import { FriendStatusResolver } from "./resolvers/friend/FriendStatus";
import { FriendRequestsResolver } from "./resolvers/friend/FriendRequests";
import { UsersResolver } from "./resolvers/user/Users";
import { DeletePostResolver } from "./resolvers/post/DeletePost";
import { FeedResolver } from "./resolvers/post/Feed";
import { SignOutResolver } from "./resolvers/sign/SignOut";
import { CreatePostResolver } from "./resolvers/post/CreatePost";
import { SignInResolver } from "./resolvers/sign/SignIn";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { context } from "./context";
import { SignUpResolver } from "./resolvers/sign/SignUp";
import { UserResolver } from "./resolvers/user/User";
import { FriendsResolver } from "./resolvers/friend/Friends";
import { MeResolver } from "./resolvers/user/Me";

export const createServer = async () => {
  const schema = await buildSchema({
    resolvers: [
      MeResolver,
      SignUpResolver,
      SignInResolver,
      CreatePostResolver,
      SignOutResolver,
      FeedResolver,
      DeletePostResolver,
      UsersResolver,
      FriendRequestsResolver,
      UserResolver,
      FriendStatusResolver,
      FriendsResolver,
      SendRequestResolver,
      CancelRequestResolver,
      UnfriendResolver,
      AcceptRequestResolver,
      RejectRequestResolver,
      UpdateBackgroundResolver,
      UpdateAvatarResolver,
      MessageReceivedResolver,
      CreateChatResolver,
      ChatsResolver,
      ChatCreatedResolver,
      CreateMessageResolver,
      ChatResolver,
    ],
  });

  const server = new ApolloServer({
    // schema: applyMiddleware(schema, permissions),
    schema,
    context,
    playground: true,
    introspection: true,
  });

  return server;
};
