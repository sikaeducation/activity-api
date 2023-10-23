// import { authenticate } from "@feathersjs/authentication";

import { hooks as schemaHooks } from "@feathersjs/schema";

import {
  activityQueryValidator,
  activityResolver,
  activityExternalResolver,
  activityQueryResolver,
} from "./activity.schema";

import type { Application } from "../../declarations";
import { ActivityService, getOptions } from "./activity.class";

export const activityPath = "activities";
export const activityMethods = ["find", "get", "remove"] as const;

export * from "./activity.class";
export * from "./activity.schema";

export const activity = (app: Application) => {
  app.use(activityPath, new ActivityService(getOptions(app)), {
    methods: activityMethods,
    events: [],
  });
  app.service(activityPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(activityExternalResolver),
        schemaHooks.resolveResult(activityResolver),
      ],
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

declare module "../../declarations" {
  interface ServiceTypes {
    [activityPath]: ActivityService;
  }
}
