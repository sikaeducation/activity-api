import { article } from "./article/article";
import { vocab } from "./vocab/vocab";
import { activity } from "./activity/activity";
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from "../declarations";

export const services = (app: Application) => {
  app.configure(article);
  app.configure(vocab);
  app.configure(activity);
  // All services will be registered here
};

/*
// Add to activities after hook
import { getContent, getAllContent } from "./content";
	app.service<"activities">("activities").hooks({
		after: {
			find: [getAllContent],
			get: [getContent],
		},
	});
*/
