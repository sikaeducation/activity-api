import { Schema } from "mongoose";
import Activity from "./Activity";
import type { ActivityExercise } from "../../types";

const schema = new Schema<ActivityExercise>(
  {
    submission_url: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    solution_url: {
      type: String,
      required: true,
    },
    tests: {
      type: Boolean,
      required: true,
    },
  },
  {
    discriminatorKey: "_type",
  }
);

export default Activity.discriminator("Exercise", schema);
