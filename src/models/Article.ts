import { Schema } from "mongoose";
import Activity from "./Activity";
// import type { ActivityArticle } from "../../types";

type ArticleDocument = {
  _type: string;
  published: boolean;
  tags: string[];
  notes: string;
  description: string;
  title: string;
  post_slug: string;
};

const schema = new Schema<ArticleDocument>(
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
