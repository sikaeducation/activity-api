import request from "supertest";
import { test, expect, describe, beforeEach } from "vitest";
import { app } from "@/app";
import { resetDatabase } from "$/test-helpers/reset-database";
import { coachToken } from "$/test-helpers/jwt-tokens";

beforeEach(async (context) => {
  context.database = await app.get("mongodbClient");
  await resetDatabase(context.database);
});

type RESTMethods = "find" | "get" | "create" | "patch" | "remove";
type RESTFlags = Partial<Record<RESTMethods, boolean>>;

type SampleData = Record<string, unknown>[];

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
  const getItems = () => [{ ...data[0] }, { ...data[1] }];

  describe(collectionName, () => {
    find &&
      test(`Find - GET /${collectionName}`, async (context) => {
        const seedData = getItems();
        const [firstItem, secondItem] = seedData;

        await context.database!.collection(collectionName).insertMany(seedData);
        const response = await request(app)
          .get(`/${collectionName}`)
          .set("Authorization", `Bearer ${coachToken}`);

        expect(response.status).toBe(200);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(response.body.data).toMatchObject([
          {
            _id: expect.any(String) as string,
            ...firstItem,
          },
          {
            _id: expect.any(String) as string,
            ...secondItem,
          },
        ]);
      });

    get &&
      test(`Get - GET /${collectionName}/:id`, async (context) => {
        const seedData = getItems();
        const [firstItem] = seedData;

        const { insertedIds } = await context
          .database!.collection(collectionName)
          .insertMany(seedData);
        const firstId = Object.values(insertedIds)[0].toString();

        const response = await request(app)
          .get(`/${collectionName}/${firstId}`)
          .set("Authorization", `Bearer ${coachToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          _id: firstId,
          ...firstItem,
        });
      });

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
        const [firstItem, secondItem] = seedData;

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
