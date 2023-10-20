import request from "supertest";
import { test, expect, describe } from "vitest";
import app from "../src/app";

import sinon from "sinon";

import * as postsService from "../src/services/posts";
import * as gitHubIntegration from "../src/services/github";

const populatePostsStub = sinon
  .stub(postsService, "populatePosts")
  .returns(Promise.resolve());

sinon
  .stub(gitHubIntegration, "verifyWebHook")
  .withArgs(sinon.match.any, "valid")
  .returns(true)
  .withArgs(sinon.match.any, "invalid")
  .returns(false);

describe("/regenerate-posts", () => {
  test("POST - Good data", async () => {
    expect(populatePostsStub.calledOnce).toBe(true);

    const signature = "valid";
    const response = await request(app)
      .post("/regenerate-posts")
      .set("X-Hub-Signature-256", signature);

    expect(response.statusCode).toBe(200);
  });

  test("POST - Bad data", async () => {
    expect(populatePostsStub.calledOnce).toBe(true);

    const signature = "invalid";
    const response = await request(app)
      .post("/regenerate-posts")
      .set("X-Hub-Signature-256", signature);

    expect(response.statusCode).toBe(200);
  });
});
