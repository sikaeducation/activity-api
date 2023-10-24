import type { Params } from "@feathersjs/feathers";
import { MongoDBService } from "@feathersjs/mongodb";
import type {
  MongoDBAdapterParams,
  MongoDBAdapterOptions,
} from "@feathersjs/mongodb";

import type { Application } from "@/declarations";
import type { Activity as Activity, ActivityQuery } from "./activity.schema";

export type { Activity, ActivityQuery };

export interface ActivityParams extends MongoDBAdapterParams<ActivityQuery> {}

type ActivityData = unknown;
type ActivityPatch = unknown;

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class ActivityService<
  ServiceParams extends Params = ActivityParams,
> extends MongoDBService<
  Activity,
  ActivityData,
  ActivityParams,
  ActivityPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get("paginate"),
    Model: app.get("mongodbClient").then((db) => db.collection("activities")),
  };
};
