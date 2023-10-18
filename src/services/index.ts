import { Vocab, Question, Activity, Article } from "../models";
import service from "feathers-mongoose";
import { Application } from "@feathersjs/express";

// Feathers mongoose is missing the discriminator key in its type
const patchedService = service as (
  options: Parameters<typeof service>[0] & {
    discriminators?: [typeof Article];
  },
) => ReturnType<typeof service>;

export const VocabService = patchedService({
  Model: Vocab,
  lean: true,
});
export const QuestionService = patchedService({
  Model: Question,
  lean: true,
});
export const ActivityService = patchedService({
  Model: Activity,
  discriminators: [Article],
  lean: true,
});

export type ServiceTypes = {
  activity: typeof ActivityService;
  question: typeof QuestionService;
  vocab: typeof VocabService;
};

export const attachServices = (app: Application) => {
  app.use("activity", ActivityService);
  app.use("question", QuestionService);
  app.use("vocab", VocabService);
};
