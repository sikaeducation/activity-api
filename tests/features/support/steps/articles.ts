import { Given, Then } from "@cucumber/cucumber";
import { expect } from "expect";
import type { Response } from "superagent";

import { getDatabase } from "../../../database-connection";

import type { Db } from "mongodb";

async function resetArticles(database: Db) {
  const existingArticles = await database
    .collection("activities")
    .find()
    .toArray();
  if (existingArticles.length) {
    await database.collection("activities").drop();
  }
}

Given("there are {int} saved articles", async function (count: number) {
  const database = await getDatabase();
  await resetArticles(database);

  const newArticles = Array.from({ length: count }, () => ({}));
  await database.collection("activities").insertMany(newArticles);
});

Then("I see {int} articles", function (count: number) {
  this.request.then((response: Response) => {
    expect(response.body.activities).toHaveLength(count);
  });
});
