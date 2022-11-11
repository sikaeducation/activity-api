import { When, Then } from "@cucumber/cucumber";
import expect from "expect";
import sinon from "sinon";

import * as postsService from "../../../../src/services/posts";
import * as gitHubIntegration from "../../../../src/integrations/github";

const populatePostsStub = sinon
  .stub(postsService, "populatePosts")
  .returns(Promise.resolve());

sinon
  .stub(gitHubIntegration, "verifyWebHook")
  .withArgs(sinon.match.any, Buffer.from("valid", "utf8"))
  .returns(true)
  .withArgs(sinon.match.any, Buffer.from("invalid", "utf8"))
  .returns(false);

When(
  "I make a POST request to the {string} endpoint with a {string} webhook token",
  async function (endpoint, validity) {
    const signature = validity;
    this.request = await this.request
      .post(endpoint)
      .set("X-Hub-Signature-256", signature);
  }
);

Then("posts are repopulated", function () {
  expect(populatePostsStub.calledOnce).toBe(true);
});

Then("I get a {int} response code", function (statusCode) {
  const response = this.request;
  expect(response.statusCode).toBe(statusCode);
});
