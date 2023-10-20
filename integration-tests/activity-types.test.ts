import request from "supertest";
import { describe, expect, test } from "vitest";
import app from "../src/app";

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

const activitySampleData = {
	article: {
		_id: "507f1f77bcf86cd799439011",
		_type: "Article",
		title: "Intro to Mongo",
		post_slug: "/",
	},
	vocabList: {
		_id: "507f1f77bcf86cd799439011",
		_type: "VocabList",
		title: "Mongo Vocab",
		entries: "mongod: daemon, document: like a record",
	},
} as const;

describe("Using /POST to create different kinds of activity", () => {
	Object.entries(activitySampleData).forEach(([type, scenario]) => {
		test(`Creating activity type: ${type}`, async (context) => {
			const response = await request(app).post("/activities").send(scenario);

			expect(response.body).toMatchObject(scenario);
			const items = await context
				.database!.collection("activities")
				.find({})
				.toArray();

			expect(items[0]).toMatchObject(scenario);
		});
	});
});
