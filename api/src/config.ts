import dotenv from "dotenv";

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.development" });
} else if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
}

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const PORT = Number(process.env.PORT);
