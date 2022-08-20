import { setWorldConstructor, World } from "@cucumber/cucumber";
import app from "../../api/src/app";
import type { Application } from "express";
import type { SuperTest } from "supertest";
import type { SuperAgentRequest } from "superagent";

setWorldConstructor(function (
  this: World & { app: Application; request: SuperTest<SuperAgentRequest> }
) {
  this.app = app;
});
