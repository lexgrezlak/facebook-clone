import dotenv from "dotenv";

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.development" });
} else if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
}

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const PORT = Number(process.env.PORT);
export const NODE_ENV = process.env.NODE_ENV as string;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
export const CLOUDINARY_API_SECRET = process.env
  .CLOUDINARY_API_SECRET as string;
export const CLOUDINARY_CLOUD_NAME = process.env
  .CLOUDINARY_CLOUD_NAME as string;
