import { setWorldConstructor, World, Before } from "@cucumber/cucumber";
import app from "../../src/app";
import request from "supertest";
import { MongoClient } from "mongodb";
import type { SuperTest } from "supertest";
import type { SuperAgentRequest } from "superagent";
import type { Db } from "mongodb";

const collections = ["activities", "questions", "vocabs"];

function CustomWorld(
  this: World & { database: Db; request: SuperTest<SuperAgentRequest> }
) {}

Before(async function () {
  const client = new MongoClient(process.env.DATABASE_URL || "");
  const connection = await client.connect();
  const database = connection.db(`activityService`);

  await Promise.all(
    collections.map((collection: string) => {
      return database.collection(collection)?.deleteMany({});
    })
  );

  this.database = database;
  this.request = request(app);
});

setWorldConstructor(CustomWorld);
