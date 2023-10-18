import express from "@feathersjs/express";
import feathers from "@feathersjs/feathers";
import cors from "cors";
import morgan from "morgan";
import { connect as connectToDatabase } from "./database-connection";
import { attachHooks } from "./hooks";
import { authenticate } from "./middleware/auth0";
import { ActivityService, QuestionService, VocabService } from "./services";
import { populatePosts } from "./services/posts";
import indexRoutes from "./routes/home";
import regeneratePostsRoutes from "./routes/regenerate-posts";

export const feathersApp = feathers<{
  activity: typeof ActivityService;
  question: typeof QuestionService;
  vocab: typeof VocabService;
}>();
feathersApp.use("activity", ActivityService);
feathersApp.use("question", QuestionService);
feathersApp.use("vocab", VocabService);

const app = express(feathersApp);
app.configure(express.rest());
app.use(cors());
app.use(express.json());

export default app;

if (process.env.NODE_ENV !== "test") app.use(morgan("tiny"));
if (process.env.NODE_ENV === "production") {
  app.use(authenticate);
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  !(async () => await populatePosts())();
}

connectToDatabase();
app.use("/activities", ActivityService);
app.use("/vocabs", VocabService);
app.use("/questions", QuestionService);
app.use("/", indexRoutes);
app.use(regeneratePostsRoutes);
app.use(express.errorHandler());
attachHooks(app);
