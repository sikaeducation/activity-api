import { HookContext } from "@feathersjs/feathers";
import { expect, vi, test } from "vitest";
import { getContent, getAllContent } from "../../src/hooks/content";

vi.mock("../../src/services/posts", () => ({
	getPost: vi.fn(() => "# Some Markdown"),
}));

test("#getContent adds content to single responses", async () => {
	const context = getContent({
		result: {
			_type: "Article",
			post_slug: "mongo-intro",
		},
	} as HookContext);
	expect(context.result.content).toEqual("# Some Markdown");
});

test("#getAllContent adds content to list responses", async () => {
	const context = getAllContent({
		result: [
			{
				_type: "Article",
				post_slug: "mongo-intro",
			},
			{
				_type: "Guide",
				post_slug: "mongo-intermediate",
			},
			{
				_type: "SomeOtherType",
				post_slug: "mongo-advanced",
			},
		],
	} as HookContext);

	expect(context.result).toMatchObject([
		{
			_type: "Article",
			post_slug: "mongo-intro",
			content: "# Some Markdown",
		},
		{
			_type: "Guide",
			post_slug: "mongo-intermediate",
			content: "# Some Markdown",
		},
		{
			_type: "SomeOtherType",
			post_slug: "mongo-advanced",
		},
	]);
});
