import feathers from "@feathersjs/feathers";
import express from "@feathersjs/express";
import cors from "cors";
import morgan from "morgan";

import { connect as connectToDatabase } from "./database-connection";
import { attachHooks } from "./hooks";
import { attachRoutes } from "./routes";
import { populatePosts } from "./services/posts";

const app = express(feathers());

connectToDatabase();
app.configure(express.rest());
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "test") app.use(morgan("tiny"));
if (process.env.NODE_ENV === "production")
  !(async () => await populatePosts())();

attachRoutes(app);
attachHooks(app);

export default app;
