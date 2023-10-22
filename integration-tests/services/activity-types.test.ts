/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import request from "supertest";
import { beforeEach, describe, expect, test } from "vitest";
import { app } from "../../src/app";

/*
	There are specific types of activities with their own schemas. All activities have these properties:

	| Property    | Type          | Note              |
	| ----------- | ------------- | ----------------- |
	| _id         | ActivityType  | Read only         |
	| _type       | ActivityType  |                   |
	| title       | string        |                   |
	| published   | boolean       | Defaults to false |
	| tags        | string[]      |                   |
	| notes       | string        | Optional          |
	| description | string        | Optional          |
	| created_at  | string        | Read only         |
	| updated_at  | string        | Read only         |

	These activity types are currently supported:

	* `"article"`
	* `"vocablist"`

	These are the specific schemas:

	Article:
	| Property  | Type   | Note |
	| --------- | ------ | ---- |
	| post_slug  | string |      |
	
	VocabList:
	| Property  | Type    | Note  |
	| --------- | ------- | ----- |
	| entries   | Vocab[] |       |
	
	(A `Vocab` is):
	| Property    | Type    | Note      |
	| ----------- | ------- | --------- |
	| term        | string  |           |
	| definition  | string  |           |
	| context     | string  | Optional  |
	
	Guide:
	| Property  | Type   | Note |
	| --------- | ------ | ---- |
	| post_slug  | string |      |
	
	Exercise:
	| Property        | Type    | Note              |
	| --------------- | ------- | ----------------- |
	| exercise_url    | string  |                   |
	| prompt          | string  |                   |
	| solution_url    | string  | Optional          |
	| tests           | boolean | Defaults to false |
	
	Video:
	| Property    | Type   | Note |
	| ----------  | ------ | ---- |
	| video_url   | string |      |
	
	Lesson:
	| Property | Type | Note |
	| --- | --- | --- |
	| objectives    | string[]  | Optional  |
	| video_url     | string    | Optional  |
	| plan          | string    | Optional  |
	| notes         | string    | Optional  |
	| date          | string    | Optional  |
*/

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
