import { getContent, getAllContent } from "./hooks/content";
import { serialize, serializeAll } from "./hooks/serialization";
import type { Application } from "@feathersjs/express";

export function attachHooks(app: Application) {
  app.service("activities").hooks({
    after: {
      find: [getAllContent],
      get: [getContent],
    },
  });
  app.hooks({
    after: {
      find: [serializeAll],
      get: [serialize],
    },
  });
}
