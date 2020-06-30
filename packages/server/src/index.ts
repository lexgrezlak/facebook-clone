import "reflect-metadata";
import express from "express";
import cors from "cors";
import { PORT, NODE_ENV } from "./config";
import cookieParser from "cookie-parser";
import { authorization } from "./utils/authorization";
import { createServer } from "./createServer";
import { createTypeORMConnection } from "./utils/createConnection";
import http from "http";
import path from "path";

(async () => {
  const server = await createServer();
  await createTypeORMConnection();

  const app = express();
  app.use(cors());
  app.use(cookieParser());
  app.use(authorization());
  if (NODE_ENV === "production") {
    app.use(express.static("build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
  }
  server.applyMiddleware({ app, cors: true });
  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`server ready at port ${PORT}${server.graphqlPath}`);
    console.log(`subs ready at port ${PORT}${server.subscriptionsPath}`);
  });
  // app.listen({ port: PORT }, () => {
  //   console.log(`Server ready at http://localhost:${PORT}`);
  // });
})();
