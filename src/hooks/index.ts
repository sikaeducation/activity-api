import { getContent, getAllContent } from "./content";
import type { Application } from "@feathersjs/express";

export function attachHooks(app: Application) {
  app.service("activities").hooks({
    after: {
      find: [getAllContent],
      get: [getContent],
    },
  });
}
