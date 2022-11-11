import feathers from "@feathersjs/feathers";
import service from "feathers-mongoose";
import express from "@feathersjs/express";
import cors from "cors";
import morgan from "morgan";
import { getCurrentPosts, populatePosts } from "./services/posts";
import { getContent, getAllContent } from "./hooks/content";
import regeneratePostsRoutes from "./routes/regenerate-posts";
import { insertNewPosts } from "./services/new-post-sync";

import { connect } from "./database-connection";
connect();

import Activity from "./models/Activity";
import Article from "./models/Article";
import Guide from "./models/Guide";
import Exercise from "./models/Exercise";
import VocabList from "./models/VocabList";
import Lesson from "./models/Lesson";
import Video from "./models/Video";
import Vocab from "./models/Vocab";
import Question from "./models/Question";

import indexRoutes from "./routes/index";

const app = express(feathers());

app.configure(express.rest());
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "test") app.use(morgan("tiny"));

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

app.service("activities").hooks({
  after: {
    find: [getAllContent],
    get: [getContent],
  },
});

app.use(express.errorHandler());

!(async () => {
  if (process.env.NODE_ENV === "production") {
    console.log("Populating posts...");
    await populatePosts();
    const posts = getCurrentPosts();
    await insertNewPosts(app, posts);
  }
})();

export default app;
