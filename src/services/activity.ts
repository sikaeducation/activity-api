import Activity from "../models/Activity";
import Article from "../models/Article";

import type { ActivityType } from "../../types";

type ArticleParameters = ConstructorParameters<typeof Article> & {
  type: ActivityType;
};

const activities: Record<ActivityType, typeof Article> = {
  article: Article,
} as const;

export class ActivityService {
  async find() {
    return await Activity.find();
  }
  async get(id: number) {
    return await Activity.findById(id);
  }
  async create(parameters: ArticleParameters) {
    const { type } = parameters;
    const SpecificActivity = activities[type];

    return await SpecificActivity.create(parameters);
  }
  async update(id: number, parameters: ArticleParameters) {
    const { type } = parameters;
    const SpecificActivity = activities[type];

    return await SpecificActivity.findByIdAndUpdate(id, parameters);
  }
  async remove(id: number) {
    return await Activity.findByIdAndDelete(id);
  }
  async clear() {
    return await Activity.deleteMany({});
  }
}
