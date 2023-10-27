import { feathers } from "@feathersjs/feathers";
import feathersExpress, {
  rest,
  json,
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
import { regeneratePostsRoute } from "./routes/regenerate-posts";
import { verifyWebhookMiddleware } from "./middleware/verify-webhook";
import { populatePosts } from "./post-cache";
import { requestLogger } from "./request-logger";
import { swagger } from "./swagger";

const app: Application = feathersExpress(feathers());

// Load app configuration
app.configure(configuration(configurationValidator));
app.configure(requestLogger);
app.use(cors());
app.use(json());

// Configure services and real-time functionality
app.configure(swagger);
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
if (process.env.NODE_ENV !== "test") {
  app.use(errorHandler({ logger }));
} else {
  app.use(errorHandler({ logger: false }));
}

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
if (process.env.NODE_ENV === "production") {
  app.hooks({
    setup: [populatePosts],
    teardown: [],
  });
}

export { app };
