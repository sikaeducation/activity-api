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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArticle(article: any): article is ArticleDocument {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return article._type === "article";
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function areArticles(articles: any): articles is ArticleDocument[] {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return Array.isArray(articles) && articles.every(isArticle);
}
