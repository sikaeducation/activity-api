import { Schema } from "mongoose";
import Activity from "./Activity";
import type { ActivityExercise } from "../../types";

const schema = new Schema<ActivityExercise>(
  {
    exercise_url: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    solution_url: {
      type: String,
    },
    tests: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    discriminatorKey: "_type",
  },
);

export default Activity.discriminator("Exercise", schema);
