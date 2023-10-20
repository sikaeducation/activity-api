import { Application, json, cors } from "@feathersjs/express";
import morgan from "morgan";
import { logError } from "../hooks/log-error";
import { populatePosts } from "../tools/posts";
import { authenticate } from "./auth0";

export function attachMiddleware(app: Application) {
  app.use(cors());
  app.use(json());
  app.hooks({
    around: {
      all: [logError],
    },
  });

  if (process.env.NODE_ENV !== "test") app.use(morgan("tiny"));
  if (process.env.NODE_ENV === "production") {
    app.use(authenticate);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    !(async () => await populatePosts())();
  }
}
