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
