import { SignInResolver } from "./resolvers/SignIn";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { context } from "./context";
import { MeResolver } from "./resolvers/Me";
import { SignUpResolver } from "./resolvers/SignUp";

export const createServer = async () => {
  const schema = await buildSchema({
    resolvers: [MeResolver, SignUpResolver, SignInResolver],
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
