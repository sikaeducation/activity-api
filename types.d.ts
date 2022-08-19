type ActivityType = "article" | "guide" | "exercise" | "quiz" | "lesson" | "video"

type Activity = {
  _id?: string;
  type: ActivityType;
  published: boolean;
  tags: string[];
  notes: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

type Vocab = {
  id?: string;
  term: string;
  definition: string;
  context: string;
}

type Question = {
  id?: string;
  prompt: string;
  answer: string;
}

type ActivityGuide = Activity & {
  post_url: string;
}

type ActivityArticle = Activity & {
  post_url: string;
}

type ActivityExercise = Activity & {
  submission_url: string;
  prompt: string;
  solution_url: string;
  tests: boolean;
}

type ActivityVocabList = Activity & {
  entries: Vocab[];
}

type ActivityLesson = Activity & {
  video_url: string;
  plan: string;
  objectives: string[];
  video_link: string;
  scheduled_at: string;
}

type ActivityVideo = Activity & {
  video_url: string;
}
