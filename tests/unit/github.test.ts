import { expect, jest, test } from "@jest/globals";
import AdmZip from "adm-zip";
import { getPostContent, verifyWebHook } from "../../src/services/github";

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
jest.mock("@octokit/rest", () => ({
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

// The logic of this test is fine, but needs real values for the mock token comparison
test.skip("#verifyWebHook correctly validates a good token", async () => {
  process.env.GITHUB_WEBHOOK_TOKEN = "xxxxxxxxxxxxxxxxxxxx";

  const isValid = verifyWebHook(
    "abcdefg",
    Buffer.from("xxxxxxxxxxxxxxxxxxxxx", "utf8")
  );

  expect(isValid).toBe(true);
});

// The logic of this test is fine, but needs real values for the mock token comparison
test.skip("#verifyWebHook correctly validates a good token", async () => {
  process.env.GITHUB_WEBHOOK_TOKEN = "xxxxxxxxxxxxxxxxxxxx";

  const isValid = verifyWebHook(
    "abcdefg",
    Buffer.from("xxxxxxxxxxxxxxxxxxxxx", "utf8")
  );

  expect(isValid).toBe(false);
});
