import { Schema } from "mongoose";
import Activity from "./Activity";
import type { ActivityArticle } from "../../types";

const schema = new Schema<ActivityArticle>(
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

export default Activity.discriminator("Article", schema);
