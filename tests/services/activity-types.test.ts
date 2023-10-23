/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import request from "supertest";
import { beforeEach, describe, expect, test } from "vitest";
import { app } from "@/app";
import { resetDatabase } from "../setup-tests";

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

beforeEach(async (context) => {
  context.database = await app.get("mongodbClient");
  await resetDatabase(context.database);
});

describe("activities", () => {
  beforeEach(async (context) => {
    await context.database!.collection("activities").insertMany(seedData);
  });

  test("Listing - GET /activities", async () => {
    const response = await request(app).get("/activities");

    expect(response.body.data).toHaveLength(seedData.length);
  });

  seedData.forEach((data) => {
    test(`Listing By Type - /activities?_type=${data._type}`, async () => {
      const response = await request(app)
        .get("/activities")
        .query({ _type: data._type });

      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0]).toMatchObject(data);
    });
  });
});
