import { Schema } from "mongoose";
import Activity from "./Activity";
import type { ActivityGuide } from "../../types";

const schema = new Schema<ActivityGuide>(
  {
    post_url: {
      type: String,
      required: true,
    },
  },
  {
    discriminatorKey: "_type",
  }
);

export default Activity.discriminator("Guide", schema);
