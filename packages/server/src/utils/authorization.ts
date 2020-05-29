import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

interface Token {
  userId: number;
  iat: number;
}

export function authorization() {
  return function (req: any, res: any, next: any) {
    const { token } = req.cookies;
    if (!token) return next();

    try {
      const properToken = token.replace("Bearer ", "");
      const verifiedToken = verify(properToken, JWT_SECRET) as Token;
      const { userId } = verifiedToken;
      req.userId = userId;
    } catch (error) {
      res.clearCookie("token");
    }

    return next();
  };
}
