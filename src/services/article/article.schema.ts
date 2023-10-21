// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import { ObjectIdSchema } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import type { ArticleService } from "./article.class";

import { activitySchema } from "../activity/activity.schema";

// Main data model schema
export const articleProperties = Type.Object(
  {
    _id: ObjectIdSchema(),
    post_slug: Type.String(),
  },
  { $id: "Article", additionalProperties: false },
);
export const articleSchema = Type.Intersect([
  activitySchema,
  articleProperties,
]);
export type Article = Static<typeof articleSchema>;
export const articleValidator = getValidator(articleSchema, dataValidator);
export const articleResolver = resolve<Article, HookContext<ArticleService>>(
  {},
);

export const articleExternalResolver = resolve<
  Article,
  HookContext<ArticleService>
>({});

// Schema for creating new entries
export const articleDataSchema = Type.Pick(
  articleSchema,
  ["title", "description", "published", "notes", "tags", "post_slug"],
  {
    $id: "ArticleData",
  },
);
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
