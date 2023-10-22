import { ObjectId } from "mongodb";
import request from "supertest";
import { test, expect, describe } from "vitest";
import { app } from "../src/app";

type SampleData = [Record<string, unknown>, Record<string, unknown>];
export default function generateRESTTests(
  collectionName: string,
  data: SampleData,
) {
  const [firstItem, secondItem] = data;
  const firstId = "507f1f77bcf86cd799439011";
  const secondId = "507f1f77bcf86cd799439012";

  describe(collectionName, () => {
    test(`Listing - GET /${collectionName}`, async (context) => {
      const seedData = [
        {
          _id: new ObjectId(firstId),
          ...firstItem,
        },
        {
          _id: new ObjectId(secondId),
          ...secondItem,
        },
      ];

      await context.database!.collection(collectionName).insertMany(seedData);
      const response = await request(app).get(`/${collectionName}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([
        {
          _id: firstId,
          ...firstItem,
        },
        {
          _id: secondId,
          ...secondItem,
        },
      ]);
    });

    test(`Find - GET /${collectionName}/:id`, async (context) => {
      const seedData = [
        {
          _id: new ObjectId(firstId),
          ...firstItem,
        },
      ];

      await context.database!.collection(collectionName).insertMany(seedData);
      const response = await request(app).get(`/${collectionName}/${firstId}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        _id: firstId,
        ...firstItem,
      });
    });

    test(`Create - POST /${collectionName}`, async (context) => {
      const postResponse = await request(app)
        .post(collectionName)
        .send(firstItem);

      expect(postResponse.status).toBe(201);
      expect(postResponse.body).toMatchObject({
        _id: expect.any(String) as string,
        ...firstItem,
      });

      const items = await context
        .database!.collection(collectionName)
        .find({})
        .toArray();

      expect(items[0]).toMatchObject(firstItem);
    });

    test(`Update - PATCH /${collectionName}/:id`, async (context) => {
      const seedData = {
        _id: new ObjectId(firstId),
        ...firstItem,
      };
      await context.database!.collection(collectionName).insertOne(seedData);

      const response = await request(app)
        .patch(`/${collectionName}/${firstId}`)
        .send(secondItem);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        _id: firstId,
        ...secondItem,
      });
    });

    test(`Destroy - DELETE /${collectionName}/:id`, async (context) => {
      const seedData = [
        {
          _id: new ObjectId(firstId),
          ...firstItem,
        },
        {
          _id: new ObjectId(secondId),
          ...secondItem,
        },
      ];
      await context.database!.collection(collectionName).insertMany(seedData);

      const response = await request(app).delete(
        `/${collectionName}/${firstId}`,
      );

      expect(response.status).toBe(204);
      const items = await context
        .database!.collection(collectionName)
        .find({})
        .toArray();

      expect(items).toHaveLength(1);
    });
  });
}
