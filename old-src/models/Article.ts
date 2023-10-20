/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { InferSchemaType, Schema } from "mongoose";
import { ActivityModel, ActivityDocument } from "./Activity";

const schema = new Schema(
  {
    post_slug: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
  },
  {
    discriminatorKey: "_type",
  },
);

export type ArticleDocument = ActivityDocument & InferSchemaType<typeof schema>;
export const ArticleSchema = ActivityModel.discriminator("Article", schema);

export function isArticle(article: any): article is ArticleDocument {
  return article._type === "article";
}
export function areArticles(articles: any): articles is ArticleDocument[] {
  return Array.isArray(articles) && articles.every(isArticle);
}
