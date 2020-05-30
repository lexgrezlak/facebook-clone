import { AcceptRequestResolver } from "./resolvers/AcceptRequest";
import { UnfriendResolver } from "./resolvers/Unfriend";
import { CancelRequestResolver } from "./resolvers/CancelRequest";
import { SendRequestResolver } from "./resolvers/SendRequest";
import { FriendStatusResolver } from "./resolvers/FriendStatus";
import { FriendRequestsResolver } from "./resolvers/FriendRequests";
import { UsersResolver } from "./resolvers/Users";
import { DeletePostResolver } from "./resolvers/DeletePost";
import { FeedResolver } from "./resolvers/Feed";
import { SignOutResolver } from "./resolvers/SignOut";
import { CreatePostResolver } from "./resolvers/CreatePost";
import { SignInResolver } from "./resolvers/SignIn";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { context } from "./context";
import { MeResolver } from "./resolvers/Me";
import { SignUpResolver } from "./resolvers/SignUp";
import { UserResolver } from "./resolvers/User";
import { FriendsResolver } from "./resolvers/Friends";

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
