import { expect, jest, test, beforeEach } from "@jest/globals";
import { populatePosts, getCurrentPosts } from "../../src/services/posts";

jest.mock("../../src/integrations/github", () => ({
  getPostContent: jest.fn(() =>
    Promise.resolve([
      {
        name: "mongo-guide",
        content: "# Some markdown",
      },
      {
        name: "sql-1",
        content: "# Some other markdown",
      },
    ])
  ),
}));

beforeEach(() => {
  jest.resetModules(); // Module has cached state
});

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
  const { getPost, populatePosts } = await import("../../src/services/posts");
  const initialPost = getPost("mongo-guide");
  expect(initialPost).toBe("");

  await populatePosts();

  const populatedPost = getPost("mongo-guide");

  expect(populatedPost).toEqual("# Some markdown");
});
