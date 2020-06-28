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
    synchronize: false,
    logging: false,
    extra: {
      ssl: true,
    },
    entities: ["dist/entity/**/*.ts"],
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
