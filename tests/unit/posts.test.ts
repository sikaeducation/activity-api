import { expect, vi, test, beforeEach } from "vitest";
import { populatePosts, getCurrentPosts } from "../../src/services/posts";

vi.mock("../../src/services/github", () => ({
	getPostContent: vi.fn(() =>
		Promise.resolve({
			"mongo-guide": "# Some markdown",
			"sql-1": "# Some other markdown",
		}),
	),
}));

beforeEach(() => {
	vi.resetModules(); // Module has cached state
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
	// Get around cached state
	const { getPost, populatePosts } = await import("../../src/services/posts");
	const initialPost = getPost("mongo-guide");
	expect(initialPost).toBe("");

	await populatePosts();

	const populatedPost = getPost("mongo-guide");

	expect(populatedPost).toEqual("# Some markdown");
});
