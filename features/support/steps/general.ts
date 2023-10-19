import { When, Then, Given } from "@cucumber/cucumber";
import expect from "expect";
import { ObjectId } from "mongodb";

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
const httpMethods = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
} as const;

When(
  "I make a {string} request to the {string} endpoint",
  async function (method: HTTPMethod, endpoint: string) {
    const normalizedMethod = httpMethods[method];
    this.request = await this.request[normalizedMethod](endpoint).expect(
      (response: any) => {
        if (response.status >= 400)
          throw new Error(JSON.stringify(response.body));
      },
    );
  },
);

When(
  "I make a {string} request to the {string} endpoint with:",
  async function (method: HTTPMethod, endpoint: string, table) {
    const normalizedMethod = httpMethods[method];
    const data = table.hashes()[0];

    this.request = await this.request[normalizedMethod](endpoint)
      .send(data)
      .expect((response: any) => {
        if (response.status >= 400)
          throw new Error(JSON.stringify(response.body));
      });
  },
);

Given("these {string} exist:", async function (collection, table) {
  const data = table.hashes().map((record: any) => {
    record._id = record._id ? new ObjectId(record._id) : undefined;
    return record;
  });
  await this.database.collection(collection).insertMany(data);
});

Given("this exists in {string}:", async function (collection, table) {
  const data = table.hashes()[0];
  data._id = data._id ? new ObjectId(data._id) : undefined;
  await this.database.collection(collection).insertOne(data);
});

Then("I see these {string}:", async function (resourceType, table) {
  const data = table.hashes();
  const response = await this.request;
  expect(response.body).toMatchObject(data);
});

Then("I see this {string}:", async function (resourceType, table) {
  const data = table.hashes()[0];

  const response = await this.request;
  expect(response.body).toMatchObject(data);
});

Then("these are saved in {string}:", async function (collection, table) {
  const expected = table.hashes().map((record: any) => {
    record._id = record._id ? new ObjectId(record._id) : undefined;
    return record;
  });
  const actual = await this.database.collection(collection).find({}).toArray();
  expect(actual).toMatchObject(expected);
});

Then("this is saved in {string}:", async function (collection, table) {
  const data = table.hashes()[0];
  data._id = data._id ? new ObjectId(data._id) : undefined;
  const record = await this.database
    .collection(collection)
    .findOne({ _id: data._id });

  expect(record).toMatchObject(data);
});