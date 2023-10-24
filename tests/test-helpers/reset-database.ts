import { Db } from "mongodb";

export async function resetDatabase(database: Db) {
  const collections = await database.collections();
  await Promise.all(collections.map((collection) => collection.drop()));
}
