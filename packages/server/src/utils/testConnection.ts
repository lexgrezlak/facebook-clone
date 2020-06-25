import { createConnection, getConnectionOptions, getConnection } from "typeorm";
import { NODE_ENV } from "../config";

const createTestConnection = async () => {
  const options = await getConnectionOptions(NODE_ENV);

  return createConnection({
    ...options,
    name: "default",
    synchronize: true,
    dropSchema: true,
  });
};

export const testConnection = {
  async create() {
    await createTestConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
