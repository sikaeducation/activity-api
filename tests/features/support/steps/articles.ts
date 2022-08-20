import {Given, Then} from "@cucumber/cucumber"
import {expect} from "expect";
import type {Response} from "superagent";

import {getDatabase} from "../../../database-connection"

import type {Db} from "mongodb"

async function resetArticles(database: Db) {
  const existingArticles = await database.collection("articles").find().toArray()
  if (existingArticles.length) {
    await database.collection("articles").drop()
  }
}

Given("there are {int} saved articles", async function (count: number) {
  const database = await getDatabase()
  await resetArticles(database)

  const newArticles = Array.from({length: count}, () => ({}))
  await database.collection("articles").insertMany(newArticles)
});

Then("I see {int} articles", function (count: number) {
  this.request.then((response: Response) => {
    expect(response.body.articles).toHaveLength(count)
  });
})
