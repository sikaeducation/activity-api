import { When, Then } from "@cucumber/cucumber";
import expect from "expect";
import { ObjectId } from "mongodb";

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
const httpMethods = {
	GET: "get",
	POST: "post",
	PUT: "put",
	PATCH: "patch",
	DELETE: "delete",
} as const;

When(
	"I make a {string} request to the {string} endpoint with a vocab list:",
	async function(method: HTTPMethod, endpoint: string, table) {
		const normalizedMethod = httpMethods[method];
		const data = table.hashes()[0];
		data.entries = data.entries.split(", ").reduce((list: any, entry: any) => {
			const [term, definition] = entry.split(": ");
			return [...list, { term, definition }];
		}, []);

		this.request = await this.request[normalizedMethod](endpoint)
			.send(data)
			.expect((response: any) => {
				if (response.status >= 400)
					throw new Error(JSON.stringify(response.body));
			});
	},
);

Then(
	"this vocab list is saved in {string}:",
	async function(collection, table) {
		const data = table.hashes()[0];
		data._id = data._id ? new ObjectId(data._id) : undefined;
		data.entries = data.entries.split(", ").reduce((list: any, entry: any) => {
			const [term, definition] = entry.split(": ");
			return [...list, { term, definition }];
		}, []);

		const record = await this.database
			.collection(collection)
			.findOne({ _id: data._id });

		expect(record).toMatchObject(data);
	},
);
