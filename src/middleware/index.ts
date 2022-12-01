import express from "@feathersjs/express";
import cors from "cors";
import morgan from "morgan";
import { authenticate } from "./auth0";
import { populatePosts } from "../services/posts";
import { connect as connectToDatabase } from "../database-connection";
import type { Application } from "@feathersjs/express";

export function attachMiddleware(app: Application) {
  connectToDatabase();
  app.configure(express.rest());
  app.use(cors());
  app.use(express.json());
  if (process.env.NODE_ENV !== "test") app.use(morgan("tiny"));
  if (process.env.NODE_ENV === "production") {
    app.use(authenticate);
    !(async () => await populatePosts())();
  }
}
