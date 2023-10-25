import { authenticate } from "@feathersjs/authentication";

import { hooks as schemaHooks } from "@feathersjs/schema";

import {
  articleDataValidator,
  articlePatchValidator,
  articleQueryValidator,
  articleResolver,
  articleExternalResolver,
  articleDataResolver,
  articlePatchResolver,
  articleQueryResolver,
  articleSchema,
  articleDataSchema,
  articlePatchSchema,
  articleQuerySchema,
} from "./article.schema";

import type { Application } from "@/declarations";
import { ArticleService, getOptions } from "./article.class";
import { onlyCoaches } from "@/hooks/only-coaches";
import { createSwaggerServiceOptions } from "feathers-swagger";

export const articlePath = "articles";
export const articleMethods = [
  "find",
  "get",
  "create",
  "patch",
  "remove",
] as const;

export * from "./article.class";
export * from "./article.schema";

export const article = (app: Application) => {
  app.use(articlePath, new ArticleService(getOptions(app)), {
    methods: articleMethods,
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: {
        articleSchema,
        articleDataSchema,
        articlePatchSchema,
        articleQuerySchema,
      },
      docs: {
        description: "",
        securities: ["all"],
      },
    }),
  });
  app.service(articlePath).hooks({
    around: {
      all: [
        authenticate("jwt"),
        schemaHooks.resolveExternal(articleExternalResolver),
        schemaHooks.resolveResult(articleResolver),
      ],
      create: [onlyCoaches],
      patch: [onlyCoaches],
      remove: [onlyCoaches],
    },
    before: {
      all: [
        schemaHooks.validateQuery(articleQueryValidator),
        schemaHooks.resolveQuery(articleQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(articleDataValidator),
        schemaHooks.resolveData(articleDataResolver),
      ],
      patch: [
        schemaHooks.validateData(articlePatchValidator),
        schemaHooks.resolveData(articlePatchResolver),
      ],
      remove: [],
    },
    after: {
      all: [],
      find: [],
    },
    error: {
      all: [],
    },
  });
};

declare module "@/declarations" {
  interface ServiceTypes {
    [articlePath]: ArticleService;
  }
}
