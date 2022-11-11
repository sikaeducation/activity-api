import { getPostContent } from "../services/github";

const posts: Record<string, string> = {};
type File = {
  name: string;
  content: string;
};

export function getPost(slug: string) {
  return posts[slug] ? posts[slug] : "";
}

export async function populatePosts() {
  const files = await getPostContent();
  files.forEach((file: File) => {
    posts[file.name] = file.content;
  });
}

export function getCurrentPosts() {
  return Object.keys(posts);
}
