import express, { notFound, errorHandler } from "@feathersjs/express";
import { feathers } from "@feathersjs/feathers";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
import { connect as connectToDatabase } from "./database-connection";

import type { ServiceTypes } from "./services";

import { attachHooks } from "./hooks";
import { attachMiddleware } from "./middleware";
import { attachRoutes } from "./routes";
import { logger } from "./tools/logger";

export const feathersApp = feathers<ServiceTypes>();
const app = express<ServiceTypes>(feathersApp);

connectToDatabase(app);
attachMiddleware(app);
attachRoutes(app);
attachHooks(app);

app.use(notFound());
app.use(errorHandler({ logger }));

export default app;
