import { MongoClient } from "mongodb";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL must be defined");

const client = new MongoClient(url);

export async function getDatabase() {
  await client.connect();
  return client.db("activityService");
}
