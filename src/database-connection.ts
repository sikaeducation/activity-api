import { Application } from "@feathersjs/express";
import { HookContext, NextFunction } from "@feathersjs/feathers";
import mongoose from "mongoose";

export function connect(app: Application) {
	app.hooks({
		setup: [
			async (context: HookContext, next: NextFunction) => {
				const url = process.env.DATABASE_URL;
				if (!url) throw new Error("DATABASE_URL must be defined");

				const database = await mongoose.connect(url, {
					dbName: "activityService",
				});
				context.app.set("database", database);
				await next();
			},
		],
		teardown: [
			async (context: HookContext, next: NextFunction) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
				await context.app.get("database").close();
				await next();
			},
		],
	});
}
