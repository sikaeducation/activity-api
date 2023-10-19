import { Application, json, cors } from "@feathersjs/express";
import morgan from "morgan";
import { populatePosts } from "../services/posts";
import { authenticate } from "./auth0";

export default function attachMiddleware(app: Application) {
  app.use(cors());
  app.use(json());

  if (process.env.NODE_ENV !== "test") app.use(morgan("tiny"));
  if (process.env.NODE_ENV === "production") {
    app.use(authenticate);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    !(async () => await populatePosts())();
  }
}
