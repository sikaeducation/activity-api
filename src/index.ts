import { app } from "./app";
import { logger } from "./logger";
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";

if (process.env.NODE_ENV === "production") {
	Sentry.init({
		dsn: process.env.SENTRY_URL,
		integrations: [new ProfilingIntegration()],
		tracesSampleRate: 1.0,
		profilesSampleRate: 1.0,
	});
	logger.info("Sentry running");
}

const port = app.get("port");

process.on("unhandledRejection", (reason) =>
	logger.error("Unhandled Rejection %O", reason),
);

app.listen(port).then(() => {
	logger.info(`API listening for requests on port ${port}`);
});
