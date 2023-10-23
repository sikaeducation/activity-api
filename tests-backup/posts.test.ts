import { expect, vi, test } from "vitest";
import { getPost, populatePosts, getCurrentPosts } from "@/tools/posts";

vi.mock("@/tools/github", () => ({
  getPostContent: vi.fn(() =>
    Promise.resolve({
      "mongo-guide": "# Some markdown",
      "sql-1": "# Some other markdown",
    }),
  ),
}));

test("#getCurrentPosts initializes to empty array", () => {
  const currentPosts = getCurrentPosts();
  expect(currentPosts).toEqual([]);
});

test("#populatePosts adds posts to memo", async () => {
  await populatePosts();
  const currentPosts = getCurrentPosts();
  expect(currentPosts).toEqual(["mongo-guide", "sql-1"]);
});

test("#getPost", async () => {
  const initialPost = getPost("mongo-guide");
  expect(initialPost).toBe("");

  await populatePosts();

  const populatedPost = getPost("mongo-guide");

  expect(populatedPost).toEqual("# Some markdown");
});
