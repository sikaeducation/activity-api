import express from "@feathersjs/express";
import { feathers } from "@feathersjs/feathers";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
import { connect as connectToDatabase } from "./database-connection";

import type { ServiceTypes } from "./services";

import { attachHooks } from "./hooks";
import { attachMiddleware } from "./middleware";
import { attachRoutes } from "./routes";

// TODO: How does the other repo do this
connectToDatabase();

export const feathersApp = feathers<ServiceTypes>();
const app = express<ServiceTypes>(feathersApp);

attachMiddleware(app);
attachRoutes(app);
attachHooks(app);

export default app;
