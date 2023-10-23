import request from "supertest";
import { test, expect, describe, beforeEach } from "vitest";
import { app } from "@/app";
import { Db } from "mongodb";
import { resetDatabase } from "./setup-tests";

beforeEach(async (context) => {
  context.database = await app.get("mongodbClient");
  await resetDatabase(context.database);
});

type RESTMethods = "find" | "get" | "create" | "patch" | "remove";
type RESTFlags = Partial<Record<RESTMethods, boolean>>;

type SampleData = [Record<string, unknown>, Record<string, unknown>];

declare module "vitest" {
  export interface TestContext {
    database?: Db;
  }
}

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
  const [firstItem, secondItem] = data;

  describe(collectionName, () => {
    find &&
      test(`Listing - GET /${collectionName}`, async (context) => {
        const seedData = [firstItem, secondItem];

        await context.database!.collection(collectionName).insertMany(seedData);
        const response = await request(app).get(`/${collectionName}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          data: [
            expect.objectContaining(firstItem),
            expect.objectContaining(secondItem),
          ],
        });
      });

    get &&
      test(`Get - GET /${collectionName}/:id`, async (context) => {
        const seedData = [firstItem];

        const { insertedIds } = await context
          .database!.collection(collectionName)
          .insertMany(seedData);
        const firstId = Object.values(insertedIds)[0].toString();

        const response = await request(app).get(
          `/${collectionName}/${firstId}`,
        );

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          _id: firstId,
          ...firstItem,
        });
      });

    create &&
      test(`Create - POST /${collectionName}`, async (context) => {
        const postResponse = await request(app)
          .post(`/${collectionName}`)
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
        const seedData = firstItem;
        const record = await context
          .database!.collection(collectionName)
          .insertOne(seedData);
        const firstId = record.insertedId.toString();

        const response = await request(app)
          .patch(`/${collectionName}/${firstId}`)
          .send(secondItem);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          ...secondItem,
        });
      });

    remove &&
      test(`Remove - DELETE /${collectionName}/:id`, async (context) => {
        const seedData = [firstItem, secondItem];
        const { insertedIds } = await context
          .database!.collection(collectionName)
          .insertMany(seedData);
        const firstId = Object.values(insertedIds)[0].toString();

        const response = await request(app).delete(
          `/${collectionName}/${firstId}`,
        );

        expect(response.status).toBe(200);
        const items = await context
          .database!.collection(collectionName)
          .find({})
          .toArray();

        expect(items).toHaveLength(1);
      });
  });
}
