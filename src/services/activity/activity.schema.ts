/* eslint-disable @typescript-eslint/require-await */
import { resolve, virtual } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import { ObjectIdSchema } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";

import type { HookContext } from "@/declarations";
import { dataValidator, queryValidator } from "@/validators";
import type { ActivityService } from "./activity.class";
import { getPost } from "@/post-cache";
import { Article } from "../article/article.class";

// Main data model schema
export const activitySchema = Type.Object({
  _id: ObjectIdSchema(),
  _type: Type.String(),
  title: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  published: Type.Boolean(),
  notes: Type.Optional(Type.String()),
  tags: Type.Array(Type.String()),
  content: Type.String(),
  created_at: Type.Integer(),
  updated_at: Type.Integer(),
});

export type Activity = Article;
export const activityValidator = getValidator(activitySchema, dataValidator);

export const activityResolver = resolve<Activity, HookContext<ActivityService>>(
  {
    content: virtual(async (activity) => {
      if (activity._type === "article") {
        return getPost(activity.post_slug);
      }
    }),
  },
);

export const activityExternalResolver = resolve<
  Activity,
  HookContext<ActivityService>
>({});

// Schema for allowed query properties
export const activityQueryProperties = Type.Pick(activitySchema, [
  "_id",
  "_type",
  "title",
  "description",
  "published",
  "notes",
  "tags",
]);

export const activityQuerySchema = Type.Intersect(
  [
    querySyntax(activityQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
);
export type ActivityQuery = Static<typeof activityQuerySchema>;
export const activityQueryValidator = getValidator(
  activityQuerySchema,
  queryValidator,
);
export const activityQueryResolver = resolve<
  ActivityQuery,
  HookContext<ActivityService>
>({});
