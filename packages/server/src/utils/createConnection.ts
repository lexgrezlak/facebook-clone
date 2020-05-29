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
  let retries = 5;
  while (retries) {
    try {
      const options = await getConnectionOptions(NODE_ENV);
      return createConnection({ ...options, name: "default" });
    } catch (error) {
      console.log(error);
      retries -= 1;
      console.log(`${retries} retries left`);

      // wait 5 seconds
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  return null;
};
