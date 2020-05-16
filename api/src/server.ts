import { ApolloServer } from "apollo-server-express";
import context from "./context";
import { schema } from "./schema";
import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  schema,
  context,
  playground: true,
  introspection: true,
});

server.applyMiddleware({ app, path: "/graphql" });
app.use(cors());

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
