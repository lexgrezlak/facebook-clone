import dotenv from "dotenv";

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.development" });
} else if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
}

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const PORT = Number(process.env.PORT);

export const DATABASE_NAME = process.env.DATABASE_NAME as string;
export const DATABASE_USER = process.env.DATABASE_USER as string;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;
export const NODE_ENV = process.env.NODE_ENV as string;
