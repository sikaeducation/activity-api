// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from "@feathersjs/authentication";

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

// A configure function that registers the service and its hooks via `app.configure`
export const activity = (app: Application) => {
  // Register our service on the Feathers application
  app.use(activityPath, new ActivityService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: activityMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
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

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    [activityPath]: ActivityService;
  }
}
