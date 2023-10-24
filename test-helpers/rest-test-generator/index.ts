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
type RESTFlags = Partial<Record<RESTMethods, boolean>>;

export function generateRESTTests(
  collectionName: string,
  data: SampleData,
  { find, get, create, patch, remove }: RESTFlags = {
    find: true,
    get: true,
    create: true,
    patch: true,
    remove: true,
  },
) {
  beforeEach(async (context) => {
    context.database = await app.get("mongodbClient");
    await resetDatabase(context.database);
  });

  describe(collectionName, () => {
    find && generateFindTests(collectionName, data);
    get && generateGetTests(collectionName, data);
    create && generateCreateTests(collectionName, data);
    patch && generatePatchTests(collectionName, data);
    remove && generateRemoveTests(collectionName, data);
  });
}
