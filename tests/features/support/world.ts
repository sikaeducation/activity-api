import { setWorldConstructor, World, Before } from "@cucumber/cucumber";
import app from "../../api/src/app";
import type { SuperTest } from "supertest";
import request from "supertest";
import type { SuperAgentRequest } from "superagent";
import { getDatabase } from "../../database-connection";
import type { Db } from "mongodb";

async function CustomWorld(
  this: World & { database: Db; request: SuperTest<SuperAgentRequest> }
) {}

Before(async function () {
  this.database = await getDatabase();
  const promises = ["activities", "questions", "vocabs"].map(
    (collection: string) => {
      return this.database
        .collection(collection)
        .drop()
        .then(() => {
          return this.database.createCollection(collection);
        });
    }
  );
  await Promise.all(promises);

  this.request = request(app);
});

setWorldConstructor(CustomWorld);
