import type { Params } from "@feathersjs/feathers";
import { MongoDBService } from "@feathersjs/mongodb";
import type {
  MongoDBAdapterParams,
  MongoDBAdapterOptions,
} from "@feathersjs/mongodb";

import type { Application } from "@/declarations";
import type {
  Article,
  ArticleData,
  ArticlePatch,
  ArticleQuery,
} from "./article.schema";

export type { Article, ArticleData, ArticlePatch, ArticleQuery };

export interface ArticleParams extends MongoDBAdapterParams<ArticleQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class ArticleService<
  ServiceParams extends Params = ArticleParams,
> extends MongoDBService<Article, ArticleData, ArticleParams, ArticlePatch> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get("paginate"),
    Model: app.get("mongodbClient").then((db) => db.collection("articles")),
  };
};
