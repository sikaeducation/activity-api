// import { authenticate } from "@feathersjs/authentication";

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
} from "./vocab.schema";

import type { Application } from "../../declarations";
import { VocabService, getOptions } from "./vocab.class";

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
  });
  app.service(vocabPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(vocabExternalResolver),
        schemaHooks.resolveResult(vocabResolver),
      ],
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

declare module "../../declarations" {
  interface ServiceTypes {
    [vocabPath]: VocabService;
  }
}
