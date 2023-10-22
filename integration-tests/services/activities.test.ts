import generateRestTests from "../generate-rest-tests";

generateRestTests(
  "articles",
  [
    {
      type: "article",
      title: "Intro to Mongo",
    },
    {
      type: "article",
      title: "Mongo practice",
    },
  ],
  { find: true, get: true, remove: true },
);
