import { Octokit } from "octokit";
import AdmZip, { IZipEntry } from "adm-zip";
import axios from "axios";
import { mapValues, keyBy } from "lodash/fp";
import crypto from "crypto";

async function getArchiveUrl() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  return octokit.rest.repos
    .downloadZipballArchive({
      owner: "sikaeducation",
      repo: "posts",
      ref: "master",
    })
    .then((response) => response.url);
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

export async function getPostContent() {
  return getArchiveUrl()
    .then(getFiles)
    .then(processFiles)
    .catch((error: { message: string }) => {
      console.error(error.message);
    });
}

export function verifyWebHook(body: unknown, rawSignature: string) {
  const signature = Buffer.from(rawSignature, "utf8");
  const GITHUB_WEBHOOK_TOKEN = process.env.GITHUB_WEBHOOK_TOKEN || "";

  const hmac = crypto.createHmac("sha256", GITHUB_WEBHOOK_TOKEN);
  const digest = Buffer.from(
    `sha256=${hmac.update(JSON.stringify(body)).digest("hex")}`,
    "utf8",
  );
  console.log("stuff", { GITHUB_WEBHOOK_TOKEN, signature, hmac, digest });

  return crypto.timingSafeEqual(signature, digest);
}
