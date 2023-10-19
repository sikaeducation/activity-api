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
