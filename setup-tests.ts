import { Db } from "mongodb";

process.env.NODE_ENV = "test";

declare module "vitest" {
  export interface TestContext {
    database?: Db;
  }
}

export async function resetDatabase(database: Db) {
  const collections = ["activities", "articles", "vocab"];

  await Promise.all(
    collections.map((collection: string) => {
      return database.collection(collection)?.deleteMany({});
    }),
  );
}
