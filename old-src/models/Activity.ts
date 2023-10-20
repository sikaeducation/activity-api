import mongoose, { Schema, InferSchemaType } from "mongoose";

const schema = new Schema(
  {
    _type: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    notes: String,
    description: String,
    title: String,
  },
  {
    timestamps: true,
    discriminatorKey: "_type",
  },
);

export type ActivityDocument = InferSchemaType<typeof schema>;
export const ActivityModel = mongoose.model<ActivityDocument>(
  "Activity",
  schema,
);
