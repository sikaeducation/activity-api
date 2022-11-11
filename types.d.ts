export type ActivityType = "article";
/*
  | "guide"
  | "exercise"
  | "quiz"
  | "lesson"
  | "video";
*/

type MongoDocument = {
  _id?: string;
  created_at?: string;
  updated_at?: string;
};

export type Activity = {
  _type: ActivityType;
  title: string;
  published: boolean;
  tags?: string[];
  notes?: string;
  description?: string;
} & MongoDocument;

export type Vocab = {
  term: string;
  definition: string;
  context?: string;
} & MongoDocument;

export type Question = {
  prompt: string;
  answer: string;
} & MongoDocument;

export type ActivityGuide = Activity & {
  post_slug: string;
};

export type ActivityArticle = Activity & {
  post_slug: string;
};

export type ActivityExercise = Activity & {
  exercise_url: string;
  prompt: string;
  solution_url?: string;
  tests: boolean;
};

export type ActivityVocabList = Activity & {
  entries: Vocab[];
};

export type ActivityLesson = Activity & {
  video_url?: string;
  plan?: string;
  objectives?: string[];
  notes?: string;
  date?: string;
};

export type ActivityVideo = Activity & {
  video_url: string;
};
