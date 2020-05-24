import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { ApolloServer } from "apollo-server-express";
import { context } from "./context";

export const createServer = async () => {
  const schema = await buildSchema({ resolvers: [UserResolver] });

  const server = new ApolloServer({
    // schema: applyMiddleware(schema, permissions),
    schema,
    context,
    playground: true,
    introspection: true,
  });

  return server;
};
