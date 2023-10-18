import { readdir } from "fs/promises";
import { ActivityService } from "./src/services";

const POSTS_FOLDER = "./posts";
const GITHUB_BASE = "https://github.com/sikaeducation/posts/blob/master";

function process() {
  readdir(POSTS_FOLDER)
    .then((folders: string[]) => {
      return folders
        .filter((folder: string) => folder !== ".git")
        .map((folder: string) => {
          console.log(`Adding ${folder}...`);
          return ActivityService.create({
            _type: "article",
            title: folder,
            post_url: `${GITHUB_BASE}/${folder}`,
          });
        });
    })
    .then((articles) => Promise.all(articles))
    .catch((error: { message: string }) => {
      console.error(error.message);
    });
}

process();
