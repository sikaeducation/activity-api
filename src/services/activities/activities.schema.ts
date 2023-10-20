/* eslint-disable @typescript-eslint/require-await */
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import { ObjectIdSchema } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import type { ActivitiesService } from "./activities.class";

// Main data model schema
export const activitiesSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    _type: Type.String(),
    title: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    published: Type.Boolean(),
    notes: Type.Optional(Type.String()),
    tags: Type.Array(Type.String()),
    createdAt: Type.Integer(),
    updatedAt: Type.Integer(),
  },
  { $id: "Activities", additionalProperties: false },
);
// Article is
// post_slug: Type.String(),
// content: Type.String(),

export type Activities = Static<typeof activitiesSchema>;
export const activitiesValidator = getValidator(
  activitiesSchema,
  dataValidator,
);
export const activitiesResolver = resolve<
  Activities,
  HookContext<ActivitiesService>
>({});

export const activitiesExternalResolver = resolve<
  Activities,
  HookContext<ActivitiesService>
>({});

// Schema for creating new entries
export const activitiesDataSchema = Type.Pick(
  activitiesSchema,
  ["_type", "title", "description", "published", "notes", "tags"],
  {
    $id: "ActivitiesData",
  },
);
export type ActivitiesData = Static<typeof activitiesDataSchema>;
export const activitiesDataValidator = getValidator(
  activitiesDataSchema,
  dataValidator,
);
export const activitiesDataResolver = resolve<
  Activities,
  HookContext<ActivitiesService>
>({
  published: async (value) => {
    return value ? value : false;
  },
  tags: async (value) => {
    return value ? value : [];
  },
  createdAt: async () => {
    return Date.now();
  },
  updatedAt: async () => {
    return Date.now();
  },
});

// Schema for updating existing entries
export const activitiesPatchSchema = Type.Partial(activitiesSchema, {
  $id: "ActivitiesPatch",
});
export type ActivitiesPatch = Static<typeof activitiesPatchSchema>;
export const activitiesPatchValidator = getValidator(
  activitiesPatchSchema,
  dataValidator,
);
export const activitiesPatchResolver = resolve<
  Activities,
  HookContext<ActivitiesService>
>({});

// Schema for allowed query properties
export const activitiesQueryProperties = Type.Pick(activitiesSchema, [
  "_id",
  "_type",
  "title",
  "description",
  "published",
  "notes",
  "tags",
]);

export const activitiesQuerySchema = Type.Intersect(
  [
    querySyntax(activitiesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
);
export type ActivitiesQuery = Static<typeof activitiesQuerySchema>;
export const activitiesQueryValidator = getValidator(
  activitiesQuerySchema,
  queryValidator,
);
export const activitiesQueryResolver = resolve<
  ActivitiesQuery,
  HookContext<ActivitiesService>
>({});
