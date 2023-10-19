import service from "feathers-mongoose";
import { ActivityModel } from "../models/Activity";
import { ArticleSchema } from "../models/Article";
import { VocabModel } from "../models/Vocab";

// Feathers mongoose is missing the discriminator key in its type
const patchedService = service as (
  options: Parameters<typeof service>[0] & {
    discriminators?: [typeof ArticleSchema];
  },
) => ReturnType<typeof service>;

export const VocabService = patchedService({
  Model: VocabModel,
  lean: true,
});

export const ActivityService = patchedService({
  Model: ActivityModel,
  discriminators: [ArticleSchema],
  lean: true,
});

export type ServiceTypes = {
  activities: typeof ActivityService;
  vocabs: typeof VocabService;
};
