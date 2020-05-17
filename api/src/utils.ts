import { Context } from "./context";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

interface Token {
  userId: string;
}

export function getUserId(ctx: Context) {
  const authorization = ctx.req.headers.authorization;
  console.log(ctx.req.headers);
  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    const verifiedToken = verify(token, JWT_SECRET) as Token;
    return verifiedToken?.userId;
  }
}
