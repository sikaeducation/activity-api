import { beforeEach } from "vitest";
import { Db, MongoClient } from "mongodb";

process.env.NODE_ENV = "test";

declare module "vitest" {
	export interface TestContext {
		database?: Db;
	}
}

let database: Db;

beforeEach(async (context) => {
	database = await connectToDatabase();
	context.database = database;
	await resetDatabase(context.database);
});

export async function connectToDatabase() {
	if (!process.env.DATABASE_URL)
		throw new Error("Can't connect to database, DATABASE_URL is undefined");
	const client = new MongoClient(process.env.DATABASE_URL);
	const connection = await client.connect();
	return connection.db(`activityService`);
}

export async function resetDatabase(database: Db) {
	const collections = ["activities", "vocabs"];

	await Promise.all(
		collections.map((collection: string) => {
			return database.collection(collection)?.deleteMany({});
		}),
	);
}
