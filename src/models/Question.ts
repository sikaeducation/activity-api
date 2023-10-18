import mongoose from "mongoose";
import type { Question } from "../../types";

const schema = new mongoose.Schema<Question>(
  {
    prompt: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Question", schema);
