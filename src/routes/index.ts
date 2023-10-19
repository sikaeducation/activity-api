import { Application } from "@feathersjs/express";
import { ActivityService, VocabService } from "../services";
import { HomeRoute } from "./home";
import { RegeneratePostsRoute } from "./regenerate-posts";
import { rest, notFound, errorHandler } from "@feathersjs/express";

export default function attachRoutes(app: Application) {
  app.configure(rest());
  app.use("/activities", ActivityService);
  app.use("/vocab", VocabService);
  app.post("/regenerate-posts", RegeneratePostsRoute);
  app.use("/", HomeRoute);

  app.use(notFound());
  app.use(errorHandler());
}
