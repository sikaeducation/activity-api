import feathers from "@feathersjs/feathers";
import service from "feathers-mongoose";
import express from "@feathersjs/express";
import cors from "cors";
import morgan from "morgan";

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
app.use(morgan("tiny"));

app.use(
  "/activities",
  service({
    Model: Activity,
    discriminators: [Article, Guide, Exercise, VocabList, Lesson, Video],
  } as any)
); // mongoose-feathers is missing the discriminators key in this type
app.use("/vocabs", service({ Model: Vocab, lean: true }));
app.use("/questions", service({ Model: Question }));
app.use("/", indexRoutes);

app.use(express.errorHandler());

app.service("vocabs").hooks({
  before: {
    patch(context: any) {
      context.params.mongoose = {
        upsert: true,
      };
    },
  },
});

export default app;
