import { getPostContent } from "@/tools/github";

let posts: Record<string, string> = {};

export function resetPosts() {
  posts = {};
}

export function getPost(slug: string) {
  return posts[slug] ? posts[slug] : "";
}

export async function populatePosts() {
  const files = await getPostContent();
  posts = {
    ...posts,
    ...files,
  };
}

export function getCurrentPosts() {
  return Object.keys(posts);
}
