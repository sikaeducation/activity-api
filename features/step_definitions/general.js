/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Given, When, Then, Before, DataTable } from "vitest-cucumber-plugin";
import { expect } from "vitest";
import { ObjectId } from "mongodb";
import { connectToDatabase, createRequest } from "../support/test-utilities";

const httpMethods = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
Before("Connect to database", async (state) => {
  state.database = await connectToDatabase();
  return state;
});

When(
  "I make a {string} request to the {string} endpoint",
  function (state, [method, endpoint], table) {
    const normalizedMethod = httpMethods[method];
    state.request = createRequest().then((request) => {
      return request[normalizedMethod](endpoint).expect((response) => {
        if (response.status >= 400)
          throw new Error(JSON.stringify(response.body));
      });
    });

    return state;
  },
);

When(
  "I make a {string} request to the {string} endpoint with:",
  function (state, [method, endpoint], table) {
    const normalizedMethod = httpMethods[method];
    const data = DataTable(table)[0];

    state.request = createRequest().then((request) => {
      return request[normalizedMethod](endpoint)
        .send(data)
        .expect((response) => {
          if (response.status >= 400)
            throw new Error(JSON.stringify(response.body));
        });
    });

    return state;
  },
);

Given("these {string} exist:", function (state, [collection], table) {
  const data = DataTable(table).map((record) => {
    record._id = record._id ? new ObjectId(record._id) : undefined;
    return record;
  });
  state.database.collection(collection).insertMany(data);

  return state;
});

Given("this exists in {string}:", function (state, [collection], table) {
  const data = DataTable(table)[0];
  data._id = data._id ? new ObjectId(data._id) : undefined;
  state.database.collection(collection).insertOne(data);

  return state;
});

Then("I see these {string}:", function (state, [resourceType], table) {
  const data = DataTable(table);

  return state.request.then((response) => {
    expect(response.body).toMatchObject(data);
  });
});

Then("I see this {string}:", function (state, [resourceType], table) {
  const data = DataTable(table)[0];

  return state.request.then((response) => {
    expect(response.body).toMatchObject(data);
  });
});

Then("these are saved in {string}:", function (state, [collection], table) {
  const expected = DataTable(table).map((record) => {
    record._id = record._id ? new ObjectId(record._id) : undefined;
    return record;
  });
  return Promise.resolve().then(() => {
    return state.database
      .collection(collection)
      .findOne({ _id: data._id })
      .then((record) => {
        expect(record).toMatchObject(data);
      });
  });
});

Then("this is saved in {string}:", function (state, [collection], table) {
  const data = DataTable(table)[0];
  data._id = data._id ? new ObjectId(data._id) : undefined;
  return Promise.resolve().then(() => {
    return state.database
      .collection(collection)
      .findOne({ _id: data._id })
      .then((record) => {
        expect(record).toMatchObject(data);
      });
  });
});
