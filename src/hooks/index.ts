/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getContent, getAllContent } from "./content";
import { feathersApp } from "../app";

export function attachHooks(app: typeof feathersApp) {
  // @ts-ignore because this is untyped
  app.service("activity").hooks({
    after: {
      find: [getAllContent],
      get: [getContent],
    },
  });
}
