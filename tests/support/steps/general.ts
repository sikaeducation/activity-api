import { When, Then } from "@cucumber/cucumber";
import { expect } from "expect";

When("I make a request to the index route", async function () {
  this.request = this.request.get("/");
});

Then("I get description of the API", async function () {
  const response = await this.request.expect("Content-Type", /json/);

  expect(response.body).toMatchObject({
    description: expect.stringMatching(/.*/),
  });
});

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
    this.request = this.request[normalizedMethod](endpoint);
  }
);
