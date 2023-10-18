import express, { Application } from "@feathersjs/express";
import { ActivityService, QuestionService, VocabService } from "../services";
import indexRoutes from "./index";
import regeneratePostsRoutes from "./index";

export default function attachRoutes(app: Application) {
  app.use("/activities", ActivityService);
  app.use("/vocabs", VocabService);
  app.use("/questions", QuestionService);
  app.use("/", indexRoutes);
  app.use(regeneratePostsRoutes);
  app.use(express.errorHandler());
}
