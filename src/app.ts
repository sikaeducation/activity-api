import express from "@feathersjs/express";
import feathers from "@feathersjs/feathers";
import { connect as connectToDatabase } from "./database-connection";

import { attachHooks } from "./hooks";
import attachMiddleware from "./middleware";
import { attachServices, ServiceTypes } from "./services";
import attachRoutes from "./routes";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
connectToDatabase();

export const feathersApp = feathers<ServiceTypes>();
const app = express(feathersApp);

attachMiddleware(app);
attachServices(feathersApp);
attachRoutes(app);
attachHooks(app);

export default app;
