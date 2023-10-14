import indexRoutes from "./home";
import regeneratePostsRoutes from "./regenerate-posts";
import express from "@feathersjs/express";
import type { Application } from "@feathersjs/express";
import { ActivityService, QuestionService, VocabService } from "../services";

export function attachRoutes(app: Application) {
  app.use("/activities", ActivityService);
  app.use("/vocabs", VocabService);
  app.use("/questions", QuestionService);
  app.use("/", indexRoutes);
  app.use(regeneratePostsRoutes);
  app.use(express.errorHandler());
}
