import { Octokit } from "octokit";
import AdmZip, { IZipEntry } from "adm-zip";
import axios from "axios";
import { mapValues, keyBy } from "lodash/fp";
import { logger } from "@/logger";

async function getArchiveUrl() {
  const octokit = new Octokit({
    auth: process.env.REPO_TOKEN,
  });
  const repos = await octokit.rest.repos.downloadZipballArchive({
    owner: "sikaeducation",
    repo: "posts",
    ref: "master",
  });
  return repos.url;
}

async function getFiles(url: string) {
  return axios
    .get<string | Buffer>(url, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const zip = new AdmZip(response.data);
      return zip.getEntries();
    });
}

function entryToFile(entry: IZipEntry) {
  return {
    name: entry.entryName.split("/")[1],
    content: entry.getData().toString("utf8"),
  };
}

function processFiles(entries: IZipEntry[]) {
  const files = entries
    .filter((entry) => entry.name === "README.md")
    .map(entryToFile);

  const byName = keyBy<{ content: string }>("name")(files);
  return mapValues("content")(byName);
}

export default async function getGitHubPosts() {
  return getArchiveUrl()
    .then(getFiles)
    .then(processFiles)
    .catch((error: { message: string }) => {
      logger.error(error.message);
    });
}
