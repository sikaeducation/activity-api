import {
  HookContext as FeathersHookContext,
  NextFunction,
} from "@feathersjs/feathers";
import { Application as FeathersApplication } from "@feathersjs/express";
import { ApplicationConfiguration } from "./configuration";
import { ServiceSwaggerOptions } from "feathers-swagger";

export { NextFunction };

// The types for app.get(name) and app.set(name)
export interface Configuration extends ApplicationConfiguration {
  publicPort: string;
}

// A mapping of service names to types. Will be extended in service files.
export interface ServiceTypes {}

// The application instance type that will be used everywhere else
export type Application = FeathersApplication<ServiceTypes, Configuration>;

// The context for hook functions - can be typed with a service class
export type HookContext<S = unknown> = FeathersHookContext<Application, S>;

declare module "@feathersjs/feathers" {
  interface ServiceOptions {
    docs?: ServiceSwaggerOptions;
  }
}
