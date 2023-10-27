import configuration from "@feathersjs/configuration";
import feathersExpress, {
  cors,
  errorHandler,
  json,
  notFound,
  rest,
} from "@feathersjs/express";
import { feathers } from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio";

import { authentication } from "./authentication";
import { channels } from "./channels";
import { configurationValidator } from "./configuration";
import type { Application } from "./declarations";
import { logError } from "./hooks/log-error";
import { logger } from "./logger";
import { verifyWebhookMiddleware } from "./middleware/verify-webhook";
import { mongodb } from "./mongodb";
import { populatePosts } from "./post-cache";
import { requestLogger } from "./request-logger";
import { regeneratePostsRoute } from "./routes/regenerate-posts";
import { services } from "./services/index";
import { swagger } from "./swagger";
import * as Sentry from "@sentry/node";

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

// 404s and Error Handlers
if (process.env.NODE_ENV === "production") {
  app.use(Sentry.Handlers.errorHandler());
}
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
