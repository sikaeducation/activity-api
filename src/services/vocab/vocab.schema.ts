// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import { ObjectIdSchema } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import type { VocabService } from "./vocab.class";

// Main data model schema
export const vocabSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    term: Type.String(),
    definition: Type.String(),
    context: Type.Optional(Type.String()),
  },
  { $id: "Vocab", additionalProperties: false },
);
export type Vocab = Static<typeof vocabSchema>;
export const vocabValidator = getValidator(vocabSchema, dataValidator);
export const vocabResolver = resolve<Vocab, HookContext<VocabService>>({});

export const vocabExternalResolver = resolve<Vocab, HookContext<VocabService>>(
  {},
);

// Schema for creating new entries
export const vocabDataSchema = Type.Pick(
  vocabSchema,
  ["term", "definition", "context"],
  {
    $id: "VocabData",
  },
);
export type VocabData = Static<typeof vocabDataSchema>;
export const vocabDataValidator = getValidator(vocabDataSchema, dataValidator);
export const vocabDataResolver = resolve<Vocab, HookContext<VocabService>>({});

// Schema for updating existing entries
export const vocabPatchSchema = Type.Partial(vocabSchema, {
  $id: "VocabPatch",
});
export type VocabPatch = Static<typeof vocabPatchSchema>;
export const vocabPatchValidator = getValidator(
  vocabPatchSchema,
  dataValidator,
);
export const vocabPatchResolver = resolve<Vocab, HookContext<VocabService>>({});

// Schema for allowed query properties
export const vocabQueryProperties = Type.Pick(vocabSchema, [
  "_id",
  "term",
  "definition",
  "context",
]);
export const vocabQuerySchema = Type.Intersect(
  [
    querySyntax(vocabQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
);
export type VocabQuery = Static<typeof vocabQuerySchema>;
export const vocabQueryValidator = getValidator(
  vocabQuerySchema,
  queryValidator,
);
export const vocabQueryResolver = resolve<
  VocabQuery,
  HookContext<VocabService>
>({});
