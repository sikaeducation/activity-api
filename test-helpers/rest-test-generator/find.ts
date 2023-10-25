/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { learnerToken, coachToken } from "$/jwt-tokens";
import { SampleData } from "$/setup-tests";
import { app } from "@/app";
import { cloneDeep } from "lodash";
import request from "supertest";
import { test, beforeEach, describe, expect } from "vitest";

export default function generateFindTests(
  collectionName: string,
  items: SampleData,
) {
  describe(`Find - GET /${collectionName}`, () => {
    beforeEach(async (context) => {
      context.items = cloneDeep(items);

      await context
        .database!.collection(collectionName)
        .insertMany(context.items);
    });

    test("anonymous", async () => {
      const response = await request(app).get(`/${collectionName}`);

      expect(response.status).toBe(401);
      expect(response.body.data).toBeUndefined();
    });

    test("as a learner", async (context) => {
      const response = await request(app)
        .get(`/${collectionName}`)
        .set("Authorization", `Bearer ${learnerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toMatchObject([
        {
          _id: expect.any(String) as string,
          ...context.items?.[0],
        },
        {
          _id: expect.any(String) as string,
          ...context.items?.[1],
        },
      ]);
    });

    test("as a coach", async (context) => {
      const response = await request(app)
        .get(`/${collectionName}`)
        .set("Authorization", `Bearer ${coachToken}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toMatchObject([
        {
          _id: expect.any(String) as string,
          ...context.items?.[0],
        },
        {
          _id: expect.any(String) as string,
          ...context.items?.[1],
        },
      ]);
    });
  });
}