import { Schema } from "mongoose";
import Activity from "./Activity";
import type { ActivityVocabList } from "../../types";

import Vocab from "./Vocab";

const schema = new Schema<ActivityVocabList>(
  {
    entries: {
      type: [Vocab.schema],
      required: true,
    },
  },
  {
    discriminatorKey: "_type",
  }
);

export default Activity.discriminator("VocabList", schema);
