import { setWorldConstructor, World, Before, After } from "@cucumber/cucumber";
import app from "../../../src/app";
import request from "supertest";
import type { SuperTest } from "supertest";
import type { SuperAgentRequest } from "superagent";
import type { Db } from "mongodb";
import { getDatabase, resetDatabase } from "./database";

function CustomWorld(
  this: World & { database: Db; request: SuperTest<SuperAgentRequest> }
) {}

Before(async function () {
  const database = await getDatabase(process.env.DATABASE_URL);
  await resetDatabase(database);

  this.database = database;
  this.request = request(app);
});

Before({ tags: "@production" }, () => {
  process.env.NODE_ENV = "production";
});
After({ tags: "@production" }, () => {
  process.env.NODE_ENV = "env";
});

setWorldConstructor(CustomWorld);
