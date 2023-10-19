/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { HookContext } from "@feathersjs/feathers";
import { expect, vi, test } from "vitest";
import { getContent, getAllContent } from "./content";

vi.mock("../services/posts", () => ({
  getPost: vi.fn(() => "# Some Markdown"),
}));

test("#getContent adds content to single responses", () => {
  const context = getContent({
    result: {
      _type: "Article",
      post_slug: "mongo-intro",
    },
  } as HookContext);
  expect(context.result?.content).toEqual("# Some Markdown");
});

test("#getAllContent adds content to list responses", () => {
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
