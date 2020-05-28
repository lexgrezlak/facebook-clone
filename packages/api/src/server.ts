import { ApolloServer } from "apollo-server-express";
import { context } from "./context";
import { schema } from "./schema";
import express from "express";
import cors from "cors";
import { PORT } from "./config";
import { permissions } from "./permissions";
import { applyMiddleware } from "graphql-middleware";
import cookieParser from "cookie-parser";
import { authorization } from "./utils/authorization";

const app = express();
app.use(cookieParser());
app.use(authorization());
app.use(cors({ origin: "localhost:3000", credentials: true }));

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context,
  playground: true,
  introspection: true,
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});

export { server };
