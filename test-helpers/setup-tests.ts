import { Db } from "mongodb";

declare module "vitest" {
  export interface TestContext {
    database?: Db;
  }
}
