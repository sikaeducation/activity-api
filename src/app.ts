import feathers from "@feathersjs/feathers";
import express from "@feathersjs/express";
import { attachHooks } from "./hooks";
import { attachRoutes } from "./routes";
import { attachMiddleware } from "./middleware";

const app = express(feathers());

attachMiddleware(app);
attachRoutes(app);
attachHooks(app);

export default app;
