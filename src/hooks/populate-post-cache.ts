import { populatePosts } from "@/post-cache";

export const populatePostCache = async () => {
  if (process.env.NODE_ENV !== "test") {
    await populatePosts();
  }
};
