import { expect, vi, test, beforeEach } from "vitest";
import {
  getPost,
  populatePosts,
  getCurrentPosts,
  resetPosts,
} from "@/post-cache";
import getGitHubPosts from "@/utilities/get-github-posts";

vi.mock("@/utilities/get-github-posts", () => ({
  default: vi.fn(),
}));

beforeEach(() => resetPosts());

test("#getCurrentPosts initializes to empty array", () => {
  const currentPosts = getCurrentPosts();
  expect(currentPosts).toStrictEqual([]);
});

test("#populatePosts adds posts to memo", async () => {
  vi.mocked(getGitHubPosts).mockResolvedValue({
    "mongo-guide": "# Some markdown",
    "sql-1": "# Some other markdown",
  });

  await populatePosts();

  const currentPosts = getCurrentPosts();
  expect(currentPosts).toStrictEqual(["mongo-guide", "sql-1"]);
});

test("#getPost", async () => {
  vi.mocked(getGitHubPosts).mockResolvedValue({
    "mongo-guide": "# Some markdown",
    "sql-1": "# Some other markdown",
  });

  const initialPost = getPost("mongo-guide");
  expect(initialPost).toBe("");

  await populatePosts();

  const populatedPost = getPost("mongo-guide");
  expect(populatedPost).toBe("# Some markdown");
});
