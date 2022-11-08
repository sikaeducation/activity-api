import { Schema } from "mongoose";
import Activity from "./Activity";
import type { ActivityVideo } from "../../types";

const schema = new Schema<ActivityVideo>(
  {
    video_url: {
      type: String,
      required: true,
    },
  },
  {
    discriminatorKey: "_type",
  }
);

export default Activity.discriminator("Video", schema);
