import request from "supertest";
import { test, expect, describe, beforeEach } from "vitest";
import { app } from "@/app";
import { resetDatabase } from "$/reset-database";
import { coachToken, learnerToken } from "$/jwt-tokens";
import generateFindTests from "./rest-test-generator/find";
import generateGetTests from "./rest-test-generator/get";
import { SampleData } from "./setup-tests";

type RESTMethods = "find" | "get" | "create" | "patch" | "remove";
type RESTFlags = Partial<Record<RESTMethods, boolean>>;

export default function generateRESTTests(
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

  const getItems = () => [{ ...data[0] }, { ...data[1] }];

  describe(collectionName, () => {
    find && generateFindTests(collectionName, data);
    get && generateGetTests(collectionName, data);

    create &&
      test(`Create - POST /${collectionName}`, async (context) => {
        const [firstItem] = getItems();
        const postResponse = await request(app)
          .post(`/${collectionName}`)
          .set("Authorization", `Bearer ${coachToken}`)
          .send(firstItem);

        expect(postResponse.status).toBe(201);
        expect(postResponse.body).toMatchObject({
          _id: expect.any(String) as string,
          ...firstItem,
        });

        const [savedItem] = await context
          .database!.collection(collectionName)
          .find({})
          .toArray();

        expect(savedItem).toMatchObject(firstItem);
      });

    patch &&
      test(`Update - PATCH /${collectionName}/:id`, async (context) => {
        const [firstItem, secondItem] = getItems();
        const record = await context
          .database!.collection(collectionName)
          .insertOne(firstItem);
        const firstId = record.insertedId.toString();

        const response = await request(app)
          .patch(`/${collectionName}/${firstId}`)
          .set("Authorization", `Bearer ${coachToken}`)
          .send(secondItem);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          ...secondItem,
        });
      });

    remove &&
      test(`Remove - DELETE /${collectionName}/:id`, async (context) => {
        const seedData = getItems();
        const [_, secondItem] = seedData;

        const { insertedIds } = await context
          .database!.collection(collectionName)
          .insertMany(seedData);
        const firstId = Object.values(insertedIds)[0].toString();

        const response = await request(app)
          .delete(`/${collectionName}/${firstId}`)
          .set("Authorization", `Bearer ${coachToken}`);

        expect(response.status).toBe(200);
        const items = await context
          .database!.collection(collectionName)
          .find({})
          .toArray();

        expect(items).toHaveLength(1);
        expect(items[0]).toMatchObject(secondItem);
      });
  });
}
