import {
  Vocab,
  Question,
  Activity,
  Article,
  Guide,
  Exercise,
  VocabList,
  Lesson,
  Video,
} from "../models";
import service from "feathers-mongoose";

export const VocabService = service({ Model: Vocab, lean: true });
export const QuestionService = service({ Model: Question, lean: true });
export const ActivityService = service({
  Model: Activity,
  discriminators: [Article, Guide, Exercise, VocabList, Lesson, Video],
}); // mongoose-feathers is missing the discriminators key in this type
