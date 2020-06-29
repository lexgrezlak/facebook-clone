import {
  createConnection,
  getConnectionOptions,
  ConnectionOptions,
} from "typeorm";
import { NODE_ENV } from "../config";

async function getOptions() {
  let connectionOptions: ConnectionOptions;
  connectionOptions = {
    type: "postgres",
    synchronize: true,
    logging: true,
    entities: ["src/entity/**/*.js"],
  };

  if (process.env.DATABASE_URL) {
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
  } else {
    connectionOptions = await getConnectionOptions(NODE_ENV);
  }

  return connectionOptions;
}

export const createTypeORMConnection = async () => {
  const typeormConfig = await getOptions();
  return createConnection({ ...typeormConfig, name: "default" });
};
