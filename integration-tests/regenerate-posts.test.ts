import request from "supertest";
import { test, expect, describe, beforeAll, afterAll } from "vitest";
import { app } from "../src/app";

import sinon from "sinon";

import * as postsService from "../src/tools/posts";
import * as gitHubIntegration from "../src/tools/github";

const populatePostsStub = sinon
  .stub(postsService, "populatePosts")
  .returns(Promise.resolve());

describe("/regenerate-posts", () => {
  beforeAll(() => {
    process.env.GITHUB_WEBHOOK_TOKEN_backup = process.env.GITHUB_WEBHOOK_TOKEN;

    process.env.GITHUB_WEBHOOK_TOKEN = "valid";
  });
  afterAll(() => {
    process.env.GITHUB_WEBHOOK_TOKEN = process.env.GITHUB_WEBHOOK_TOKEN_backup;
  });
  test("POST - Good data", async () => {
    const signature = "valid";
    sinon
      .stub(gitHubIntegration, "verifyWebHook")
      .withArgs(sinon.match.any, signature)
      .returns(true);

    const response = await request(app)
      .post("/regenerate-posts")
      .set("X-Hub-Signature-256", signature);

    expect(populatePostsStub.calledOnce).toBe(true);
    expect(response.statusCode).toBe(200);
  });

  test.skip("POST - Bad data", async () => {
    const signature = "invalid";
    sinon
      .stub(gitHubIntegration, "verifyWebHook")
      .withArgs(sinon.match.any, signature)
      .returns(false);
    const response = await request(app)
      .post("/regenerate-posts")
      .set("X-Hub-Signature-256", signature);

    expect(populatePostsStub.calledOnce).toBe(true);
    expect(response.statusCode).toBe(401);
  });
});
