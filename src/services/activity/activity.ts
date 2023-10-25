import { authenticate } from "@feathersjs/authentication";
import { onlyCoaches } from "@/hooks/only-coaches";

import { hooks as schemaHooks } from "@feathersjs/schema";

import {
  activityQueryValidator,
  activityResolver,
  activityExternalResolver,
  activityQueryResolver,
  activitySchema,
  activityQuerySchema,
} from "./activity.schema";

import type { Application } from "@/declarations";
import { ActivityService, getOptions } from "./activity.class";
import { createSwaggerServiceOptions } from "feathers-swagger";

export const activityPath = "activities";
export const activityMethods = ["find", "get", "remove"] as const;

export * from "./activity.class";
export * from "./activity.schema";

export const activity = (app: Application) => {
  app.use(activityPath, new ActivityService(getOptions(app)), {
    methods: activityMethods,
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: {
        activitySchema,
        activityQuerySchema,
      },
      docs: {
        description: "All types",
        securities: ["all"],
      },
    }),
  });
  app.service(activityPath).hooks({
    around: {
      all: [
        authenticate("jwt"),
        schemaHooks.resolveExternal(activityExternalResolver),
        schemaHooks.resolveResult(activityResolver),
      ],
      remove: [onlyCoaches],
    },
    before: {
      all: [
        schemaHooks.validateQuery(activityQueryValidator),
        schemaHooks.resolveQuery(activityQueryResolver),
      ],
      find: [],
      get: [],
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
    [activityPath]: ActivityService;
  }
}
