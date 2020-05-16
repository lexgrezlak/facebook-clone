import { Context } from "./context";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

interface Token {
  userId: string;
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer", "");
    const verifiedToken = verify(token, JWT_SECRET) as Token;
    return verifiedToken?.userId;
  }
}
