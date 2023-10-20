import { ObjectId } from "mongodb";
import request from "supertest";
import { test, expect, describe } from "vitest";
import app from "../src/app";

describe("/activities", () => {
	test("Listing - GET /activities", async (context) => {
		const data = [
			{
				_id: new ObjectId("507f1f77bcf86cd799439011"),
				type: "article",
				title: "Intro to Mongo",
			},
			{
				_id: new ObjectId("507f1f77bcf86cd799439012"),
				type: "article",
				title: "Mongo practice",
			},
		];

		await context.database!.collection("activities").insertMany(data);
		const response = await request(app).get("/activities");

		expect(response.status).toBe(200);
		expect(response.body).toMatchObject([
			{
				_id: "507f1f77bcf86cd799439011",
				type: "article",
				title: "Intro to Mongo",
			},
			{
				_id: "507f1f77bcf86cd799439012",
				type: "article",
				title: "Mongo practice",
			},
		]);
	});

	test("Find - GET /vocab/:id", async (context) => {
		const data = [
			{
				_id: new ObjectId("507f1f77bcf86cd799439011"),
				term: "HTTP",
				definition: "HyperText Transfer Protocol ",
			},
		];

		await context.database!.collection("vocab").insertMany(data);
		const response = await request(app).get("/vocab/507f1f77bcf86cd799439011");

		expect(response.status).toBe(200);
		expect(response.body).toMatchObject({
			_id: "507f1f77bcf86cd799439011",
			term: "T1",
			definition: "D1",
		});
	});

	test("Create - POST /vocab", async (context) => {
		const data = [
			{
				term: "HTTP",
				definition: "HyperText Transfer Protocol ",
			},
		];

		const postResponse = await request(app).post("/vocab").send(data);

		expect(postResponse.status).toBe(201);
		expect(postResponse.body).toMatchObject({
			_id: expect.any(String) as string,
			term: "HTTP",
			definition: "HyperText Transfer Protocol",
		});

		const vocabs = await context
			.database!.collection("vocab")
			.find({})
			.toArray();

		expect(vocabs).toHaveLength(1);
	});

	test("Update - PATCH /vocab/:id", async (context) => {
		const existingData = {
			_id: new ObjectId("507f1f77bcf86cd799439011"),
			term: "HTTP",
			definition: "HyperTurd Transfer Protocol ",
		};
		await context.database!.collection("vocab").insertOne(existingData);
		const updatedData = {
			definition: "HyperText Transfer Protocol ",
		};

		const patchResponse = await request(app)
			.patch("/vocab/507f1f77bcf86cd799439011")
			.send(updatedData);

		expect(patchResponse.status).toBe(201);
		expect(patchResponse.body).toMatchObject({
			_id: "507f1f77bcf86cd799439011",
			term: "HTTP",
			definition: "HyperText Transfer Protocol",
		});
	});

	test("Destroy - DELETE /vocab/:id", async (context) => {
		const data = [
			{
				_id: new ObjectId("507f1f77bcf86cd799439011"),
				term: "HTTP",
				definition: "HyperText Transfer Protocol",
			},
			{
				_id: new ObjectId("507f1f77bcf86cd799439012"),
				term: "SSH",
				definition: "Secure Shell",
			},
		];
		await context.database!.collection("vocab").insertMany(data);

		const patchResponse = await request(app)
			.delete("/vocab/507f1f77bcf86cd799439011")
			.send(data);

		expect(patchResponse.status).toBe(204);
		const vocabs = await context
			.database!.collection("vocab")
			.find({})
			.toArray();

		expect(vocabs).toHaveLength(1);
	});
});
