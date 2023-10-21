// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from "@feathersjs/feathers";
import type {
	Activities,
	ActivitiesData,
	ActivitiesPatch,
	ActivitiesQuery,
	ActivitiesService,
} from "./activities.class";

export type { Activities, ActivitiesData, ActivitiesPatch, ActivitiesQuery };

export type ActivitiesClientService = Pick<
	ActivitiesService<Params<ActivitiesQuery>>,
	(typeof activitiesMethods)[number]
>;

export const activitiesPath = "activities";

export const activitiesMethods = [
	"find",
	"get",
	"create",
	"patch",
	"remove",
] as const;
