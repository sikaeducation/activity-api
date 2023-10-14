import express from "@feathersjs/express";
import feathers from "@feathersjs/feathers";
import cors from "cors";
import morgan from "morgan";
import { connect as connectToDatabase } from "./database-connection";
import { attachHooks } from "./hooks";
import { authenticate } from "./middleware/auth0";
import { attachRoutes } from "./routes";
import { ActivityService, QuestionService, VocabService } from "./services";
import { populatePosts } from "./services/posts";

const app = express(
  feathers<{
    activity: typeof ActivityService;
    question: typeof QuestionService;
    vocab: typeof VocabService;
  }>(),
);
app.configure(express.rest());
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "test") app.use(morgan("tiny"));
if (process.env.NODE_ENV === "production") {
  app.use(authenticate);
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  !(async () => await populatePosts())();
}

connectToDatabase();
attachRoutes(app);
attachHooks(app);

export default app;
