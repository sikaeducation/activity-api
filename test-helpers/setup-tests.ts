import { Db } from "mongodb";

export type SampleData = [Record<string, unknown>, Record<string, unknown>];

declare module "vitest" {
  export interface TestContext {
    database?: Db;
    items?: SampleData;
    firstId?: string;
    firstItem?: SampleData[0];
  }
}
