import request from "supertest";
import { vi, test, expect, describe } from "vitest";
import { app } from "@/app";

import { verifyToken } from "@/utilities/verify-token";
import { populatePosts } from "@/post-cache";

vi.mock("@/utilities/verify-token", () => {
  return {
    verifyToken: vi.fn(),
  };
});
vi.mock("@/post-cache", () => {
  return {
    populatePosts: vi.fn(),
  };
});

describe("/regenerate-posts", () => {
  test("POST - Good data", async () => {
    vi.mocked(verifyToken).mockReturnValue(true);
    vi.mocked(populatePosts).mockResolvedValue();

    const response = await request(app)
      .post("/regenerate-posts")
      .set("X-Hub-Signature-256", "valid");

    expect(vi.mocked(populatePosts).mock.calls.length).toBe(1);
    expect(response.statusCode).toBe(200);
  });

  test("POST - Bad data", async () => {
    vi.mocked(verifyToken).mockReturnValue(false);
    vi.mocked(populatePosts).mockResolvedValue();

    const response = await request(app)
      .post("/regenerate-posts")
      .set("X-Hub-Signature-256", "invalid");

    expect(vi.mocked(populatePosts).mock.calls.length).toBe(0);
    expect(response.statusCode).toBe(401);
  });
});
