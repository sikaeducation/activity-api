import mongoose from "mongoose";
import type { Activity } from "../../types";

const schema = new mongoose.Schema<Activity>(
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
  }
);

export default mongoose.model("Activity", schema);
