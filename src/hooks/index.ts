import { getContent, getAllContent } from "./content";
import type { Application } from "@feathersjs/express";
import App from "../app";

export function attachHooks(app: typeof App) {
  app.service("activities").hooks({
    after: {
      find: [getAllContent],
      get: [getContent],
    },
  });
}
