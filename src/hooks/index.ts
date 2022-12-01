import { getContent, getAllContent } from "./hooks/content";
import { serialize, serializeAll } from "./hooks/serialization";
import type { App } from "@feathersjs/express";

export function attachHooks(app: App) {
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
