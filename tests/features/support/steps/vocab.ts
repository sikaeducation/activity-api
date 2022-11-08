import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "expect";

Given("{int} saved vocabs exist", async function (count: number) {
  const vocabs = Array.from({ length: count }, () => ({}));
  if (vocabs.length) {
    await this.database.collection("vocabs").insertMany(vocabs);
  }
});

Given("the vocab for {string} exists", async function (term: string) {
  const vocab = {
    term,
  };
  await this.database.collection("vocabs").insertOne(vocab);
});

When("I list vocabs", async function () {
  this.request = this.request.get("/vocab");
});

When("I get the vocab for {string}", async function (term: string) {
  const record = await this.database.collection("vocabs").find({ term }).next();
  this.request = this.request.get(`/vocab/${record._id}`);
});

When("I create the vocab for {string}", async function (term: string) {
  this.request = await this.request.post(`/vocab`).send({
    term,
    definition: "Some definition",
  });
});

When(
  "I update the vocab definition for {string} to {string}",
  async function (term: string, definition: string) {
    const record = await this.database
      .collection("vocabs")
      .find({ term })
      .next();
    this.request = await this.request.patch(`/vocab/${record._id}`).send({
      definition,
    });
  }
);

When("I delete a vocab", async function () {
  const record = await this.database.collection("vocabs").find({}).next();
  this.request = await this.request.delete(`/vocab/${record._id}`);
});

Then("I see the vocab for {string}", async function (term: string) {
  const response = await this.request;
  expect(response.body).toMatchObject({
    term,
  });
});

Then("the vocab for {string} is saved", async function (term: string) {
  const record = await this.database.collection("vocabs").find({ term }).next();

  expect(record).toBeTruthy();
});

Then(
  "{string}'s definition is updated to {string}",
  async function (term: string, definition: string) {
    const record = await this.database
      .collection("vocabs")
      .find({ term })
      .next();

    expect(record.definition).toBe(definition);
  }
);

Then("I see {int} vocabs", async function (count: number) {
  const response = await this.request;
  expect(response.body).toHaveLength(count);
});

Then("there are {int} saved vocabs", async function (expectedCount: number) {
  const actualCount = await this.database.collection("vocabs").count();
  expect(actualCount).toBe(expectedCount);
});
