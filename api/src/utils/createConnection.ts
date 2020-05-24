import { createConnection, getConnectionOptions } from "typeorm";
import { NODE_ENV } from "../config";

export function trimAndCapitalizeSentence(string: string) {
  return string
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w: string) =>
      w.replace(/^\w/, (c: string) => c.toUpperCase())
    );
}

export const createTypeORMConnection = async () => {
  const connectionOptions = await getConnectionOptions(NODE_ENV);
  return createConnection({ ...connectionOptions, name: "default" });
};
