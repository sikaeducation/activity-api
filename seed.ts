import { readdir } from "fs/promises";
import { ActivityService } from "./src/services";

const { LOCAL_POSTS_FOLDER, GITHUB_POSTS_BASE } = process.env;

function seed() {
  if (!LOCAL_POSTS_FOLDER || !GITHUB_POSTS_BASE) {
    console.table({
      LOCAL_POSTS_FOLDER,
      GITHUB_POSTS_BASE,
    });
    throw new Error("Seed script missing required environment variables");
  }
  readdir(LOCAL_POSTS_FOLDER)
    .then((folders: string[]) => {
      return folders
        .filter((folder: string) => folder !== ".git")
        .map((folder: string) => {
          console.log(`Adding ${folder}...`);
          return ActivityService.create({
            _type: "article",
            title: folder,
            post_url: `${GITHUB_POSTS_BASE}/${folder}`,
          });
        });
    })
    .then((articles) => Promise.all(articles))
    .catch((error: { message: string }) => {
      console.error(error.message);
    });
}

seed();
