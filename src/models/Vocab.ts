import mongoose from "mongoose";
import type { Vocab } from "../../types";

const schema = new mongoose.Schema<Vocab>(
  {
    term: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
    context: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Vocab", schema);
