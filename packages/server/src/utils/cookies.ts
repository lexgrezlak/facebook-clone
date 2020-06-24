import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export function generateToken(payload: any) {
  return sign(payload, JWT_SECRET);
}

export function setCookie(res: any, token: any) {
  res.cookie("token", `Bearer ${token}`, {
    httpOnly: true,
    // 30 days
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
}

export function clearCookie(res: any) {
  res.clearCookie("token");
}
