import { MongoClient } from "mongodb";
import type { Db } from "mongodb";
import type { Application } from "./declarations";

declare module "./declarations" {
	interface Configuration {
		mongodbClient: Promise<Db>;
		mongoDatabase: string;
	}
}

export const mongodb = (app: Application) => {
	const connection = app.get("mongodb") as string;
	const mongoClient = MongoClient.connect(connection).then((client) =>
		client.db(app.get("mongoDatabase")),
	);

	app.set("mongodbClient", mongoClient);
};
