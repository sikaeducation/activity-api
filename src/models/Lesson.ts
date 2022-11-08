import { Schema } from "mongoose";
import Activity from "./Activity";
import type { ActivityLesson } from "../../types";

const schema = new Schema<ActivityLesson>(
  {
    video_url: {
      type: String,
    },
    plan: {
      type: String,
    },
    objectives: {
      type: [String],
    },
    video_link: {
      type: String,
    },
    scheduled_at: {
      type: String,
      required: true,
    },
  },
  {
    discriminatorKey: "_type",
  }
);

export default Activity.discriminator("Lesson", schema);
