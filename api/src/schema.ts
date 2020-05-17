import { intArg, makeSchema, objectType, stringArg } from "@nexus/schema";
import { nexusPrismaPlugin } from "nexus-prisma";
import { User } from "./types/User";
import { Post } from "./types/Post";
import { Query } from "./types/Query";
import { Mutation } from "./types/Mutation";
import { AuthPayload } from "./types/AuthPayload";

export const schema = makeSchema({
  types: [Query, Mutation, User, Post, AuthPayload],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + "/../schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma",
      },
      {
        source: require.resolve("./context"),
        alias: "Context",
      },
    ],
  },
});
