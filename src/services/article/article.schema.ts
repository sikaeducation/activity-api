// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import type { ArticleService } from "./article.class";

import { activitySchema } from "../activity/activity.schema";
import { getPost } from "../../tools/posts";

// Main data model schema
export const articleProperties = Type.Object(
  {
    post_slug: Type.String(),
    content: Type.String(),
  },
  { $id: "Article", additionalProperties: false },
);
export const articleSchema = Type.Intersect([
  activitySchema,
  articleProperties,
]);
export type Article = Static<typeof articleSchema>;
export const articleValidator = getValidator(articleSchema, dataValidator);
export const articleResolver = resolve<Article, HookContext<ArticleService>>({
  content: virtual(async (article) => {
    return getPost(article.post_slug);
  }),
});

export const articleExternalResolver = resolve<
  Article,
  HookContext<ArticleService>
>({});

// Schema for creating new entries
export const articleDataSchema = Type.Omit(articleSchema, [
  "created_at",
  "updated_at",
]);
export type ArticleData = Static<typeof articleDataSchema>;
export const articleDataValidator = getValidator(
  articleDataSchema,
  dataValidator,
);
export const articleDataResolver = resolve<
  Article,
  HookContext<ArticleService>
>({
  published: async (value) => {
    return value ? value : false;
  },
  tags: async (value) => {
    return value ? value : [];
  },
  created_at: async () => {
    return Date.now();
  },
  updated_at: async () => {
    return Date.now();
  },
});

// Schema for updating existing entries
export const articlePatchSchema = Type.Partial(
  Type.Omit(articleSchema, ["_type", "created_at", "updated_at"]),
  {
    $id: "ArticlePatch",
  },
);
export type ArticlePatch = Static<typeof articlePatchSchema>;
export const articlePatchValidator = getValidator(
  articlePatchSchema,
  dataValidator,
);
export const articlePatchResolver = resolve<
  Article,
  HookContext<ArticleService>
>({
  updated_at: async () => {
    return Date.now();
  },
});

// Schema for allowed query properties
export const articleQueryProperties = Type.Pick(articleSchema, ["_id"]);
export const articleQuerySchema = Type.Intersect(
  [
    querySyntax(articleQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
);
export type ArticleQuery = Static<typeof articleQuerySchema>;
export const articleQueryValidator = getValidator(
  articleQuerySchema,
  queryValidator,
);
export const articleQueryResolver = resolve<
  ArticleQuery,
  HookContext<ArticleService>
>({});
