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
    vi.mocked(verifyWebHook).mockReturnValue(true);
    vi.mocked(populatePosts).mockResolvedValue();

    const response = await request(app)
      .post("/regenerate-posts")
      .set("X-Hub-Signature-256", "valid");

    expect(vi.mocked(populatePosts).mock.calls.length).toBe(1);
    expect(response.statusCode).toBe(200);
  });

  test("POST - Bad data", async () => {
    vi.mocked(verifyWebHook).mockReturnValue(false);
    vi.mocked(populatePosts).mockResolvedValue();

    const response = await request(app)
      .post("/regenerate-posts")
      .set("X-Hub-Signature-256", "invalid");

    expect(vi.mocked(populatePosts).mock.calls.length).toBe(0);
    expect(response.statusCode).toBe(401);
  });
});
