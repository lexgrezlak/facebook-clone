import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";

export const createTestServer = (context: any) =>
  new ApolloServer({ schema, context });
