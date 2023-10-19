/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { Given, When, Then, DataTable } from "vitest-cucumber-plugin";
// import { expect } from "vitest";
// import { ObjectId } from "mongodb";
//
// const httpMethods = {
// 	GET: "get",
// 	POST: "post",
// 	PUT: "put",
// 	PATCH: "patch",
// 	DELETE: "delete",
// }
//
// When(
// 	"I make a {string} request to the {string} endpoint with a vocab list:",
// 	async function(state, [method, endpoint] table) {
// 		const normalizedMethod = httpMethods[method];
// 		const data = DataTable(table)[0]
//
// 		data.entries = data.entries
// 			.split(", ")
// 			.reduce((list, entry) => {
// 				const [term, definition] = entry.split(": ");
// 				return [...list, { term, definition }];
// 			}, []);
//
// 		state.response = await state.request[normalizedMethod](endpoint)
// 			.send(data)
// 			.expect((response) => {
// 				if (response.status >= 400)
// 					throw new Error(JSON.stringify(response.body));
// 			});
// 	},
// );
//
// Then(
// 	"this vocab list is saved in {string}:",
// 	async function(state, [collection], table) {
// 		const data = DataTable(table)[0] as {
// 			_id?: typeof ObjectId;
// 			entries: string | Vocab[];
// 		};
// 		data._id = data._id
// 			? new ObjectId(data._id)
// 			: undefined;
// 		data.entries = data.entries.split(", ").reduce((list, entry) => {
// 			const [term, definition] = entry.split(": ");
// 			return [...list, { term, definition }];
// 		}, []);
//
// 		const record = await state.database
// 			.collection(collection)
// 			.findOne({ _id: data._id });
//
// 		expect(record).toMatchObject(data);
// 	},
// );
