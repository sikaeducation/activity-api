import { describe, beforeEach } from "vitest";
import { app } from "@/app";
import { resetDatabase } from "$/reset-database";
import { SampleData } from "$/setup-tests";
import generateFindTests from "./find";
import generateGetTests from "./get";
import generateCreateTests from "./create";
import generatePatchTests from "./patch";
import generateRemoveTests from "./remove";

type RESTMethods = "find" | "get" | "create" | "patch" | "remove";

type Parameters = {
  serviceName: string;
  items: SampleData;
  tests: RESTMethods[];
  collectionName: string;
};

export type GeneratorParameters = Omit<Parameters, "tests">;

export function generateRESTTests({
  serviceName,
  items,
  tests,
  collectionName = serviceName,
}: Parameters) {
  beforeEach(async (context) => {
    context.database = await app.get("mongodbClient");
    await resetDatabase(context.database);
  });

  describe(serviceName, () => {
    tests.includes("find") &&
      generateFindTests({ collectionName, serviceName, items });
    tests.includes("get") &&
      generateGetTests({ collectionName, serviceName, items });
    tests.includes("create") &&
      generateCreateTests({ collectionName, serviceName, items });
    tests.includes("patch") &&
      generatePatchTests({ collectionName, serviceName, items });
    tests.includes("remove") &&
      generateRemoveTests({ collectionName, serviceName, items });
  });
}
