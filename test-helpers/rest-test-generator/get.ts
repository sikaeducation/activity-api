/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { learnerToken, coachToken } from "$/jwt-token-fixtures";
import { app } from "@/app";
import { cloneDeep } from "lodash";
import request from "supertest";
import { test, beforeEach, describe, expect } from "vitest";

import { GeneratorParameters } from "$/rest-test-generator";

export default function generateCreateTests({
  serviceName,
  collectionName,
  items,
}: GeneratorParameters) {
  describe(`Get - GET /${serviceName}/:id`, () => {
    beforeEach(async (context) => {
      context.items = cloneDeep(items);

      const { insertedIds } = await context
        .database!.collection(collectionName)
        .insertMany(context.items);

      context.firstId = Object.values(insertedIds)[0].toString();
    });

    test("anonymous", async (context) => {
      const response = await request(app).get(
        `/${serviceName}/${context.firstId}`,
      );

      expect(response.status).toBe(401);
      expect(response.body.data).toBeUndefined();
    });

    test("as a learner", async (context) => {
      const response = await request(app)
        .get(`/${serviceName}/${context.firstId}`)
        .set("Authorization", `Bearer ${learnerToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        _id: context.firstId,
        ...context.items?.[0],
      });
    });

    test("as a coach", async (context) => {
      const response = await request(app)
        .get(`/${serviceName}/${context.firstId}`)
        .set("Authorization", `Bearer ${coachToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        _id: context.firstId,
        ...context.items?.[0],
      });
    });
  });
}
