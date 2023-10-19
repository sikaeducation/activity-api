import { getContent, getAllContent } from "./content";
import { feathersApp } from "../app";

export function attachHooks(app: typeof feathersApp) {
  app.service<"activities">("activities").hooks({
    after: {
      find: [getAllContent],
      get: [getContent],
    },
  });
}
