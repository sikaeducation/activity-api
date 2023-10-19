import { setWorldConstructor, World, Before } from "@cucumber/cucumber";
import app from "../../src/app";
import request from "supertest";
import type { SuperTest } from "supertest";
import type { SuperAgentRequest } from "superagent";
import type { Db } from "mongodb";
import { getDatabase, resetDatabase } from "./database";

process.env.NODE_ENV = "test";

export type WorldEnvironment = World & {
  database: Db;
  request: SuperTest<SuperAgentRequest>;
};
function CustomWorld(this: WorldEnvironment) {}

Before(async function () {
  const database = await getDatabase(process.env.DATABASE_URL);
  await resetDatabase(database);

  this.database = database;
  this.request = request(app);
});

setWorldConstructor(CustomWorld);
