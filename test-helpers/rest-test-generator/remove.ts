/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { learnerToken, coachToken } from "$/jwt-tokens";
import { app } from "@/app";
import { cloneDeep } from "lodash";
import request from "supertest";
import { test, beforeEach, describe, expect } from "vitest";

import { GeneratorParameters } from "$/rest-test-generator";

export default function generateRemoveTests({
  serviceName,
  collectionName,
  items,
}: GeneratorParameters) {
  describe(`Remove - DELETE /${serviceName}/:id`, () => {
    beforeEach(async (context) => {
      context.items = cloneDeep(items);

      const { insertedIds } = await context
        .database!.collection(collectionName)
        .insertMany(context.items);
      context.firstId = Object.values(insertedIds)[0].toString();
    });

    test("anonymous", async (context) => {
      const response = await request(app).delete(
        `/${serviceName}/${context.firstId}`,
      );

      expect(response.status).toBe(401);
      expect(response.body.data).toBeUndefined();
    });

    test("as a learner", async (context) => {
      const response = await request(app)
        .delete(`/${serviceName}/${context.firstId}`)
        .set("Authorization", `Bearer ${learnerToken}`);

      expect(response.status).toBe(403);
      expect(response.body.data).toBeUndefined();
    });

    test("as a coach", async (context) => {
      const response = await request(app)
        .delete(`/${serviceName}/${context.firstId}`)
        .set("Authorization", `Bearer ${coachToken}`);

      expect(response.status).toBe(200);
      const items = await context
        .database!.collection(collectionName)
        .find({})
        .toArray();

      expect(items).toHaveLength(1);
      const savedItem = await context
        .database!.collection(collectionName)
        .findOne({});
      expect(savedItem).toMatchObject({ ...context.items?.[1] });
    });
  });
}
