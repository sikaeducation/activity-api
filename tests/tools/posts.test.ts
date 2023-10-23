import { expect, vi, test, beforeEach } from "vitest";
import {
  getPost,
  populatePosts,
  getCurrentPosts,
  resetPosts,
} from "@/tools/posts";
import { getPostContent } from "@/tools/github";

vi.mock("@/tools/github", () => ({
  getPostContent: vi.fn(),
}));

beforeEach(() => {
  resetPosts();
});

test("#getCurrentPosts initializes to empty array", () => {
  const currentPosts = getCurrentPosts();
  expect(currentPosts).toEqual([]);
});

test("#populatePosts adds posts to memo", async () => {
  vi.mocked(getPostContent).mockResolvedValue({
    "mongo-guide": "# Some markdown",
    "sql-1": "# Some other markdown",
  });
  await populatePosts();
  const currentPosts = getCurrentPosts();
  expect(currentPosts).toEqual(["mongo-guide", "sql-1"]);
});

test("#getPost", async () => {
  vi.mocked(getPostContent).mockResolvedValue({
    "mongo-guide": "# Some markdown",
    "sql-1": "# Some other markdown",
  });

  const initialPost = getPost("mongo-guide");
  expect(initialPost).toBe("");

  await populatePosts();

  const populatedPost = getPost("mongo-guide");

  expect(populatedPost).toEqual("# Some markdown");
});
