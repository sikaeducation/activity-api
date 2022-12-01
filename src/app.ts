import feathers from "@feathersjs/feathers";
import service from "feathers-mongoose";
import express from "@feathersjs/express";
import cors from "cors";
import morgan from "morgan";

import regeneratePostsRoutes from "./routes/regenerate-posts";

import { connect } from "./database-connection";
connect();

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
} from "./models";
import { attachHooks } from "./hooks";

import indexRoutes from "./routes/index";
import { populatePosts } from "./services/posts";

const app = express(feathers());

app.configure(express.rest());
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "test") app.use(morgan("tiny"));
if (process.env.NODE_ENV === "production")
  !(async () => await populatePosts())();

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

attachHooks(app);

app.use(express.errorHandler());

export default app;
