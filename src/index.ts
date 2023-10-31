import { app } from "./app";
import { logger } from "./logger";
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });
  logger.info("Sentry running");

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

const privatePort = app.get("port");
const publicPort = app.get("publicPort");

process.on("unhandledRejection", (reason) =>
  logger.error("Unhandled Rejection %O", reason),
);

app.listen(privatePort).then(() => {
  logger.info(`API listening for requests:

* Internal: http://localhost:${privatePort}
* External: http://localhost:${publicPort}

`);
});
