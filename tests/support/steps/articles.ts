import { Given, Then } from "@cucumber/cucumber";
import { expect } from "expect";

Given("there are {int} saved articles", async function (count: number) {
  const newArticles = Array.from({ length: count }, () => ({}));
  await this.database.collection("activities").insertMany(newArticles);
});

Given("there are {int} saved guides", async function (count: number) {
  const newGuides = Array.from({ length: count }, () => ({}));
  await this.database.collection("activities").insertMany(newGuides);
});

Then("I see {int} articles", async function (count: number) {
  const response = await this.request;
  expect(response.body).toHaveLength(count);
});
