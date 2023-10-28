/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { learnerToken, coachToken } from "$/jwt-token-fixtures";
import { app } from "@/app";
import { cloneDeep } from "lodash";
import request from "supertest";
import { test, beforeEach, describe, expect } from "vitest";

import { GeneratorParameters } from "$/rest-test-generator";

export default function generatePatchTests({
  serviceName,
  collectionName,
  items,
}: GeneratorParameters) {
  describe(`Patch - PATCH /${serviceName}/:id`, () => {
    beforeEach(async (context) => {
      context.items = cloneDeep(items);

      const record = await context
        .database!.collection(collectionName)
        .insertOne(context.items[0]);
      context.firstId = record.insertedId.toString();
    });

    test("anonymous", async (context) => {
      const response = await request(app)
        .patch(`/${serviceName}/${context.firstId}`)
        .send(context.items?.[1]);

      expect(response.status).toBe(401);
      expect(response.body.data).toBeUndefined();
    });

    test("as a learner", async (context) => {
      const response = await request(app)
        .patch(`/${serviceName}/${context.firstId}`)
        .set("Authorization", `Bearer ${learnerToken}`)
        .send(context.items?.[1]);

      expect(response.status).toBe(403);
      expect(response.body.data).toBeUndefined();
    });

    test("as a coach", async (context) => {
      const response = await request(app)
        .patch(`/${serviceName}/${context.firstId}`)
        .set("Authorization", `Bearer ${coachToken}`)
        .send(context.items?.[1]);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        ...context.items?.[1],
      });
    });
  });
}
