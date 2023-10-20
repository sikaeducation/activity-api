import { vocab } from './vocab/vocab'
import { activities } from './activities/activities'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(vocab)
  app.configure(activities)
  // All services will be registered here
}

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
