import { app } from "./app";
import { logger } from "./logger";

const port = app.get("port");

process.on("unhandledRejection", (reason) =>
  logger.error("Unhandled Rejection %O", reason),
);

app.listen(port).then(() => {
  logger.info(`API listening for requests`);
});
