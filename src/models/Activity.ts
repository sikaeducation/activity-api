import mongoose, { Model } from "mongoose";
import type { Activity } from "../../types";

const schema = new mongoose.Schema<Activity, Model<Activity>>(
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

const ActivitySchema = mongoose.model<Activity, Model<Activity>>(
  "Activity",
  schema,
);
export default ActivitySchema;
