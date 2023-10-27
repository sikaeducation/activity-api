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
	describe(`Create - POST /${serviceName}`, () => {
		beforeEach((context) => {
			context.items = cloneDeep(items);
		});

		test("anonymous", async (context) => {
			const response = await request(app)
				.post(`/${serviceName}`)
				.send(context.items?.[0]);

			expect(response.status).toBe(401);
			expect(response.body.data).toBeUndefined();
		});

		test("as a learner", async (context) => {
			const response = await request(app)
				.post(`/${serviceName}`)
				.set("Authorization", `Bearer ${learnerToken}`)
				.send(context.items?.[0]);

			expect(response.status).toBe(403);
			expect(response.body.data).toBeUndefined();
		});

		test("as a coach", async (context) => {
			const response = await request(app)
				.post(`/${serviceName}`)
				.set("Authorization", `Bearer ${coachToken}`)
				.send(context.items?.[0]);

			expect(response.status).toBe(201);
			expect(response.body).toMatchObject({
				_id: expect.any(String) as string,
				...context.items?.[0],
			});

			const savedItem = await context
				.database!.collection(collectionName)
				.findOne({});

			expect(savedItem).toMatchObject({ ...context.items?.[0] });
		});
	});
}
