import "reflect-metadata";
import express from "express";
import cors from "cors";
import { PORT } from "./config";
import { applyMiddleware } from "graphql-middleware";
import cookieParser from "cookie-parser";
import { authorization } from "./utils/authorization";
import { createTypeORMConnection } from "./utils/createConnection";
import { createServer } from "./createServer";

(async () => {
  const server = await createServer();
  await createTypeORMConnection();

  const app = express();
  app.use(cors({ origin: "localhost:3000", credentials: true }));
  app.use(cookieParser());
  app.use(authorization());
  server.applyMiddleware({ app, cors: false });

  app.listen({ port: PORT }, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
  });
})();
