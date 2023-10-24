import * as dotenv from "dotenv";
dotenv.config();

import { feathers } from "@feathersjs/feathers";
import express, {
  rest,
  json,
  urlencoded,
  cors,
  notFound,
  errorHandler,
} from "@feathersjs/express";
import configuration from "@feathersjs/configuration";
import socketio from "@feathersjs/socketio";

import type { Application } from "./declarations";
import { configurationValidator } from "./configuration";
import { logger } from "./logger";
import { logError } from "./hooks/log-error";
import { mongodb } from "./mongodb";
import { authentication } from "./authentication";
import { services } from "./services/index";
import { channels } from "./channels";
import regeneratePostsRoute from "./routes/regenerate-posts";
import { verifyWebhookMiddleware } from "./middleware/verify-webhook";

const app: Application = express(feathers());

// Load app configuration
app.configure(configuration(configurationValidator));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Configure services and real-time functionality
app.configure(rest());
app.configure(
  socketio({
    cors: {
      origin: app.get("origins"),
    },
  }),
);
app.configure(mongodb);
app.configure(authentication);
app.configure(services);
app.configure(channels);

// Static routes
app.post("/regenerate-posts", verifyWebhookMiddleware, regeneratePostsRoute);

// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(errorHandler({ logger }));

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError],
  },
  before: {},
  after: {},
  error: {},
});
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: [],
});

// TODO: Populate posts on load
// import { populatePosts } from "../tools/posts";
// 	// eslint-disable-next-line @typescript-eslint/no-misused-promises
// 	!(async () => await populatePosts())();
// }

export { app };
