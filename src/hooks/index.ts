import { getContent, getAllContent } from "./content";
import { serialize, serializeAll } from "./serialization";
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
