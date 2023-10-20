/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose, { Schema, InferSchemaType } from "mongoose";

const schema = new Schema(
  {
    term: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
    context: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export type VocabDocument = InferSchemaType<typeof schema>;
export const VocabModel = mongoose.model<VocabDocument>("Vocab", schema);

export function isVocab(vocab: any): vocab is VocabDocument {
  return vocab._type === "article";
}
export function areVocabs(vocabs: any): vocabs is VocabDocument[] {
  return Array.isArray(vocabs) && vocabs.every(isVocab);
}
