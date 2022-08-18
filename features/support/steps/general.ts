import {When, Then} from "@cucumber/cucumber"
import request from "supertest"
import {expect} from "expect"

import app from "../../../src/app"

When("I make a request to the index route", async function () {
  return this.request = request(app)
    .get("/")
    .expect(200)
})

Then("I get description of the API", async function () {
  const response = await this.request
    .expect("Content-Type", /json/)

  expect(response.body).toMatchObject({
    description: expect.stringMatching(/.*/)
  })
})
