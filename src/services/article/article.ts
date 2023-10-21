// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
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
} from "./article.schema";

import type { Application } from "../../declarations";
import { ArticleService, getOptions } from "./article.class";

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

// A configure function that registers the service and its hooks via `app.configure`
export const article = (app: Application) => {
  // Register our service on the Feathers application
  app.use(articlePath, new ArticleService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: articleMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(articlePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(articleExternalResolver),
        schemaHooks.resolveResult(articleResolver),
      ],
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
    },
    error: {
      all: [],
    },
  });
};

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    [articlePath]: ArticleService;
  }
}
