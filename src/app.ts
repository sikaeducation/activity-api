import express from "@feathersjs/express";
import { feathers } from "@feathersjs/feathers";
import { connect as connectToDatabase } from "./database-connection";

import { attachHooks } from "./hooks";
import attachMiddleware from "./middleware";
import { ServiceTypes } from "./services";
import attachRoutes from "./routes";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
connectToDatabase();

export const feathersApp = feathers<ServiceTypes>();
const app = express<ServiceTypes>(feathersApp);

attachMiddleware(app);
attachRoutes(app);
attachHooks(app);

export default app;
