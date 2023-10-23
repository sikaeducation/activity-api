import { beforeEach } from "vitest";
import { Db } from "mongodb";
import { app } from "./src/app";

process.env.NODE_ENV = "test";

declare module "vitest" {
  export interface TestContext {
    database?: Db;
  }
}

beforeEach(async (context) => {
  context.database = await app.get("mongodbClient");
  await resetDatabase(context.database);
});

async function resetDatabase(database: Db) {
  const collections = ["activities", "articles", "vocab"];

  await Promise.all(
    collections.map((collection: string) => {
      return database.collection(collection)?.deleteMany({});
    }),
  );
}
