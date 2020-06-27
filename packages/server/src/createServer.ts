import { PostsResolver } from "./resolvers/post/Posts";
import { DeleteCommentResolver } from "./resolvers/post/comment/DeleteComment";
import { CommentsResolver } from "./resolvers/post/comment/Comments";
import { CreateCommentResolver } from "./resolvers/post/comment/CreateComment";
import { JWT_SECRET } from "./config";
import { verify } from "jsonwebtoken";
import { NotificationsResolver } from "./resolvers/Notifications";
import { UnlikePostResolver } from "./resolvers/post/Unlike";
import { LikePostResolver } from "./resolvers/post/Like";
import { CreateMessageResolver } from "./resolvers/message/CreateMessage";
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
import { CreatePostLikeResolver } from "./resolvers/post/CreatePostLike";
import { Token } from "./types";

export const createServer = async () => {
  const schema = await buildSchema({
    resolvers: [
      MeResolver,
      SignUpResolver,
      SignInResolver,
      CreatePostResolver,
      SignOutResolver,
      PostsResolver,
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
      CreateMessageResolver,
      ChatResolver,
      CreatePostLikeResolver,
      LikePostResolver,
      UnlikePostResolver,
      NotificationsResolver,
      CreateCommentResolver,
      CommentsResolver,
      DeleteCommentResolver,
    ],
  });

  const server = new ApolloServer({
    // schema: applyMiddleware(schema, permissions),
    schema,
    context,
    subscriptions: {
      onConnect: async (connectionParams, ws: any) => {
        const { cookie } = ws.upgradeReq.headers;
        const token = cookie.replace("token=Bearer%20", "");
        const verifiedToken = verify(token, JWT_SECRET) as Token;
        const { userId } = verifiedToken;

        return { userId };
      },
    },
    playground: true,
    introspection: true,
  });

  return server;
};
