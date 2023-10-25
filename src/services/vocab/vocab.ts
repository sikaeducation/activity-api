import { authenticate } from "@feathersjs/authentication";
import { onlyCoaches } from "@/hooks/only-coaches";

import { hooks as schemaHooks } from "@feathersjs/schema";

import {
  vocabDataValidator,
  vocabPatchValidator,
  vocabQueryValidator,
  vocabResolver,
  vocabExternalResolver,
  vocabDataResolver,
  vocabPatchResolver,
  vocabQueryResolver,
  vocabSchema,
  vocabQuerySchema,
  vocabDataSchema,
  vocabPatchSchema,
} from "./vocab.schema";

import type { Application } from "@/declarations";
import { VocabService, getOptions } from "./vocab.class";
import { createSwaggerServiceOptions } from "feathers-swagger";

export * from "./vocab.class";
export * from "./vocab.schema";

export const vocabPath = "vocab";

export const vocabMethods = [
  "find",
  "get",
  "create",
  "patch",
  "remove",
] as const;

export const vocab = (app: Application) => {
  app.use(vocabPath, new VocabService(getOptions(app)), {
    methods: vocabMethods,
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: {
        vocabSchema,
        vocabDataSchema,
        vocabPatchSchema,
        vocabQuerySchema,
      },
      docs: {
        description: "",
        securities: ["all"],
      },
    }),
  });
  app.service(vocabPath).hooks({
    around: {
      all: [
        authenticate("jwt"),
        schemaHooks.resolveExternal(vocabExternalResolver),
        schemaHooks.resolveResult(vocabResolver),
      ],
      create: [onlyCoaches],
      patch: [onlyCoaches],
      remove: [onlyCoaches],
    },
    before: {
      all: [
        schemaHooks.validateQuery(vocabQueryValidator),
        schemaHooks.resolveQuery(vocabQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(vocabDataValidator),
        schemaHooks.resolveData(vocabDataResolver),
      ],
      patch: [
        schemaHooks.validateData(vocabPatchValidator),
        schemaHooks.resolveData(vocabPatchResolver),
      ],
      remove: [],
    },
    after: {
      all: [],
    },
    error: {
      all: [],
    },
  });
};

declare module "@/declarations" {
  interface ServiceTypes {
    [vocabPath]: VocabService;
  }
}
