import getGitHubPosts from "@/utilities/get-github-posts";

let posts: Record<string, string> = {};

export function resetPosts() {
  posts = {};
}

export function getPost(slug: string) {
  return posts[slug] ? posts[slug] : "";
}

export async function populatePosts() {
  const files = await getGitHubPosts();
  posts = {
    ...posts,
    ...files,
  };
}

export function getCurrentPosts() {
  return Object.keys(posts);
}
