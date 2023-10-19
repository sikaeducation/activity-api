import app from "../../src/app";
import supertestRequest from "supertest";
import { Db, MongoClient } from "mongodb";

process.env.NODE_ENV = "test";

let database: Db;

export async function createRequest() {
  const request = supertestRequest(app);
  await resetDatabase(database);

  return request;
}

export async function connectToDatabase(url = process.env.DATABASE_URL || "") {
  const client = new MongoClient(url);
  const connection = await client.connect();
  database = connection.db(`activityService`);
  return database;
}

export async function resetDatabase(database: Db) {
  const collections = ["activities", "vocabs"];

  await Promise.all(
    collections.map((collection: string) => {
      return database.collection(collection)?.deleteMany({});
    }),
  );
}
