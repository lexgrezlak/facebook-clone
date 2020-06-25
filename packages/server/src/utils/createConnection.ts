import { createConnection, getConnectionOptions } from "typeorm";
import { NODE_ENV } from "../config";

export const createTypeORMConnection = async () => {
  const options = await getConnectionOptions(NODE_ENV);
  return createConnection({ ...options, name: "default" });
};
