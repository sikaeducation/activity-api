import indexRoutes from "./home";
import regeneratePostsRoutes from "./regenerate-posts";
import service from "feathers-mongoose";
import {
  Activity,
  Article,
  Guide,
  Exercise,
  VocabList,
  Lesson,
  Video,
  Vocab,
  Question,
} from "../models";
import express from "@feathersjs/express";
import type { Application } from "@feathersjs/express";

export function attachRoutes(app: Application) {
  app.use(
    "/activities",
    service({
      Model: Activity,
      discriminators: [Article, Guide, Exercise, VocabList, Lesson, Video],
    } as any) // mongoose-feathers is missing the discriminators key in this type
  );
  app.use("/vocabs", service({ Model: Vocab, lean: true }));
  app.use("/questions", service({ Model: Question, lean: true }));
  app.use("/", indexRoutes);
  app.use(regeneratePostsRoutes);
  app.use(express.errorHandler());
}
