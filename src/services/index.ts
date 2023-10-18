import { Vocab, Question, Activity, Article } from "../models";
import service from "feathers-mongoose";

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
