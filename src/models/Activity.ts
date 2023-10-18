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
type ActivityDocument = InferSchemaType<typeof schema>;

const ActivitySchema = mongoose.model<ActivityDocument>("Activity", schema);
export default ActivitySchema;
