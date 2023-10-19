import { Db, MongoClient } from "mongodb";

export async function getDatabase(url = "") {
  const client = new MongoClient(url);
  const connection = await client.connect();
  return connection.db(`activityService`);
}

export async function resetDatabase(database: Db) {
  const collections = ["activities", "vocabs"];

  await Promise.all(
    collections.map((collection: string) => {
      return database.collection(collection)?.deleteMany({});
    }),
  );
}
