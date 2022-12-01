import { expect, jest, test } from "@jest/globals";
import AdmZip from "adm-zip";
import { getPostContent, verifyWebHook } from "../../src/services/github";
import {
  body as githubHookBody,
  signature as githubSignature,
} from "./github-token-validation-fixture";

jest.mock("axios", () => ({
  get: jest.fn(() => {
    const zip = new AdmZip();
    zip.addFile(
      "posts/mongo-intro/README.md",
      Buffer.from("# Some Markdown", "utf8")
    );
    const buffer = zip.toBuffer();
    return Promise.resolve({ data: buffer });
  }),
}));
jest.mock("octokit", () => ({
  Octokit: jest.fn(() => ({
    rest: {
      repos: {
        downloadZipballArchive: jest.fn(() =>
          Promise.resolve("https://github.com/zipballs/some-id.zip")
        ),
      },
    },
  })),
}));

test("#getPostContent retrieves post content from GitHub", async () => {
  const postContent = await getPostContent();
  expect(postContent).toEqual({ "mongo-intro": "# Some Markdown" });
});

test("#verifyWebHook verifies good tokens", async () => {
  process.env.GITHUB_WEBHOOK_TOKEN = "HTRdIMlFw0";

  const isValid = verifyWebHook(githubHookBody, githubSignature);

  expect(isValid).toBe(true);
});

test("#verifyWebHook doesn't verify bad tokens", async () => {
  process.env.GITHUB_WEBHOOK_TOKEN = "HTRdIMlFw0";

  const isValid = verifyWebHook(
    githubHookBody + "anything that doesn't belong there",
    githubSignature
  );

  expect(isValid).toBe(false);
});
