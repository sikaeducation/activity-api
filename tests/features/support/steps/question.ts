import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "expect";

Given("these questions exist:", async function (table) {
  const questions = table.hashes();
  await this.database.collection("questions").insertMany(questions);
});

Given("this question exists:", async function (table) {
  const question = table.hashes()[0];
  await this.database.collection("questions").insertOne(question);
});

When("I list all the questions", async function () {
  this.request = this.request.get("/questions");
});

When("I get the question {string}", async function (prompt) {
  const record = await this.database
    .collection("questions")
    .find({ prompt })
    .next();
  this.request = this.request.get(`/questions/${record._id}`);
});

When("I create this question:", async function (table) {
  const question = table.hashes()[0];
  this.request = await this.request.post(`/questions`).send(question);
});

When("I update the question {string} to:", async function (prompt, table) {
  const question = table.hashes()[0];
  const record = await this.database
    .collection("questions")
    .find({ prompt })
    .next();
  this.request = await this.request
    .patch(`/questions/${record._id}`)
    .send(question);
});

When("I delete the question {string}", async function (prompt) {
  const record = await this.database
    .collection("questions")
    .find({ prompt })
    .next();
  this.request = await this.request.delete(`/questions/${record._id}`);
});

Then("I see these questions:", async function (table) {
  const questions = table.hashes();
  const response = await this.request;
  expect(response.body).toMatchObject(questions);
});

Then("I see this question:", async function (table) {
  const question = table.hashes()[0];
  const response = await this.request;
  expect(response.body).toMatchObject(question);
});

Then("these questions are saved:", async function (table) {
  const expectedQuestions = table.hashes();
  const actualQuestions = await this.database
    .collection("questions")
    .find()
    .toArray();
  expect(actualQuestions).toMatchObject(expectedQuestions);
});

Then("this question is saved:", async function (table) {
  const question = table.hashes()[0];
  const record = await this.database
    .collection("questions")
    .find(question)
    .next();

  expect(record).toMatchObject(question);
});

Then("the question {string} is updated to:", async function (term, table) {
  const question = table.hashes()[0];
  const record = await this.database
    .collection("questions")
    .find({ term })
    .next();

  expect(record).toMatchObject(question);
});
