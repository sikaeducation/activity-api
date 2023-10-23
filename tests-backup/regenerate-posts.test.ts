/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import request from "supertest";
import { vi, test, expect, describe } from "vitest";
import { app } from "@/app";

import { verifyWebHook } from "@/tools/github";
import { populatePosts } from "@/tools/posts";

vi.mock("@/tools/github", () => {
  return {
    verifyWebHook: vi.fn(),
  };
});
vi.mock("@/tools/posts", () => {
  return {
    populatePosts: vi.fn(),
  };
});

describe("/regenerate-posts", () => {
  test("POST - Good data", async () => {
    verifyWebHook.mockReturnValue(true);
    console.log("hey1", verifyWebHook);
    const signature = "valid";

    const response = await request(app)
      .post("/regenerate-posts")
      .set("X-Hub-Signature-256", signature);
    console.log("hey2", verifyWebHook);

    //expect(populatePostsMock.mock.calls.length).toBe(1);
    expect(response.statusCode).toBe(200);
  });

  test.skip("POST - Bad data", async () => {
    vi.mocked(verifyWebHook).mockReturnValue(false);
    vi.mocked(populatePosts).mockReturnValue(Promise.resolve());
    const signature = "invalid";
    const response = await request(app)
      .post("/regenerate-posts")
      .set("X-Hub-Signature-256", signature);

    // expect(!!populatePostsMock.mock.calls.length).toBe(0);
    expect(response.statusCode).toBe(401);
  });
});
