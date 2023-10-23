import type { Params } from "@feathersjs/feathers";
import { MongoDBService } from "@feathersjs/mongodb";
import type {
  MongoDBAdapterParams,
  MongoDBAdapterOptions,
} from "@feathersjs/mongodb";

import type { Application } from "../../declarations";
import type { Vocab, VocabData, VocabPatch, VocabQuery } from "./vocab.schema";

export type { Vocab, VocabData, VocabPatch, VocabQuery };

export interface VocabParams extends MongoDBAdapterParams<VocabQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class VocabService<
  ServiceParams extends Params = VocabParams,
> extends MongoDBService<Vocab, VocabData, VocabParams, VocabPatch> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get("paginate"),
    Model: app.get("mongodbClient").then((db) => db.collection("vocab")),
  };
};
