import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "expect";

Given("these vocabs exist:", async function (table) {
  const vocabs = table.hashes();
  await this.database.collection("vocabs").insertMany(vocabs);
});

Given("this vocab exists:", async function (table) {
  const vocab = table.hashes()[0];
  await this.database.collection("vocabs").insertOne(vocab);
});

When("I list all the vocabs", async function () {
  this.request = this.request.get("/vocabs");
});

When("I get the vocab {string}", async function (term) {
  const record = await this.database.collection("vocabs").find({ term }).next();
  this.request = this.request.get(`/vocabs/${record._id}`);
});

When("I create this vocab:", async function (table) {
  const vocab = table.hashes()[0];
  this.request = await this.request.post(`/vocabs`).send(vocab);
});

When("I update the vocab {string} to:", async function (term, table) {
  const vocab = table.hashes()[0];
  const record = await this.database.collection("vocabs").find({ term }).next();
  this.request = await this.request.patch(`/vocabs/${record._id}`).send(vocab);
});

When("I delete the vocab {string}", async function (term) {
  const record = await this.database.collection("vocabs").find({ term }).next();
  this.request = await this.request.delete(`/vocabs/${record._id}`);
});

Then("I see these vocabs:", async function (table) {
  const vocabs = table.hashes();
  const response = await this.request;
  expect(response.body).toMatchObject(vocabs);
});

Then("I see this vocab:", async function (table) {
  const vocab = table.hashes()[0];
  const response = await this.request;
  expect(response.body).toMatchObject(vocab);
});

Then("these vocabs are saved:", async function (table) {
  const expectedVocabs = table.hashes();
  const actualVocabs = await this.database
    .collection("vocabs")
    .find()
    .toArray();
  expect(actualVocabs).toMatchObject(expectedVocabs);
});

Then("this vocab is saved:", async function (table) {
  const vocab = table.hashes()[0];
  const record = await this.database.collection("vocabs").find(vocab).next();

  expect(record).toMatchObject(vocab);
});

Then("the vocab {string} is updated to:", async function (term, table) {
  const vocab = table.hashes()[0];
  const record = await this.database.collection("vocabs").find({ term }).next();

  expect(record).toMatchObject(vocab);
});
