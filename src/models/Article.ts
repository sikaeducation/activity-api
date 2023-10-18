import { Model, Schema } from "mongoose";
import Activity from "./Activity";
import type { ActivityArticle } from "../../types";

const schema = new Schema<ActivityArticle, Model<ActivityArticle>>(
  {
    post_slug: {
      type: String,
      required: true,
    },
  },
  {
    discriminatorKey: "_type",
  },
);

const ActivityArticleSchema = Activity.discriminator("Article", schema);
export default ActivityArticleSchema;
