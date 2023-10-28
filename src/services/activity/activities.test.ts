/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import request from "supertest";
import { beforeEach, describe, expect, test } from "vitest";
import { app } from "@/app";
import { resetDatabase } from "$/reset-database";
import { learnerToken, coachToken } from "$/jwt-token-fixtures";
import { generateRESTTests } from "$/rest-test-generator";

const seedData = [
  {
    _type: "article",
    title: "Intro to Mongo",
    post_slug: "intro-to-mongo",
  },
  {
    _type: "exercise",
    title: "Mongo Exercise",
    post_slug: "mongo-exercise",
  },
];

generateRESTTests({
  serviceName: "articles",
  collectionName: "activities",
  items: [seedData[0], seedData[1]],
  tests: ["find", "get", "remove"],
});

describe("activities", () => {
  beforeEach(async (context) => {
    context.database = await app.get("mongodbClient");
    await resetDatabase(context.database);
    await context.database.collection("activities").insertMany(seedData);
  });

  describe("listing - GET /activities", () => {
    const findRequest = () => request(app).get("/activities");

    test("unauthenticated", async () => {
      const response = await findRequest();

      expect(response.status).toBe(401);
      expect(response.body.data).toBeUndefined();
    });

    test("as a learner", async () => {
      const response = await findRequest().set(
        "Authorization",
        `Bearer ${learnerToken}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(seedData.length);
    });

    test("as a coach", async () => {
      const response = await findRequest().set(
        "Authorization",
        `Bearer ${coachToken}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(seedData.length);
    });
  });
  seedData.forEach((data) => {
    describe(`listing By Type - /activities?_type=`, () => {
      const queryRequest = () =>
        request(app).get("/activities").query({ _type: data._type });

      test("as anonymous", async () => {
        const response = await queryRequest();

        expect(response.status).toBe(401);
        expect(response.body.data).toBeUndefined();
      });

      test("as a learner", async () => {
        const response = await queryRequest().set(
          "Authorization",
          `Bearer ${learnerToken}`,
        );

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data[0]).toMatchObject(data);
      });

      test("as a coach", async () => {
        const response = await queryRequest().set(
          "Authorization",
          `Bearer ${coachToken}`,
        );

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveLength(1);
        expect(response.body.data[0]).toMatchObject(data);
      });
    });
  });
});
