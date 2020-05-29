import { makeSchema, connectionPlugin } from "@nexus/schema";
import { nexusPrismaPlugin } from "nexus-prisma";
import types from "./types";

export const schema = makeSchema({
  types,
  plugins: [nexusPrismaPlugin(), connectionPlugin()],
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
