import { expect, vi, test } from "vitest";
import AdmZip from "adm-zip";
import { getPostContent, verifyWebHook } from "@/tools/github";
import axios from "axios";
import { Octokit } from "octokit";
import {
  body as githubHookBody,
  signature as githubSignature,
} from "./github-token-validation-fixture";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock("octokit", () => ({
  Octokit: vi.fn(),
}));

const getMockRepo = () => {
  const zip = new AdmZip();
  zip.addFile(
    "posts/mongo-intro/README.md",
    Buffer.from("# Some Markdown", "utf8"),
  );
  const buffer = zip.toBuffer();
  return Promise.resolve({ data: buffer });
};

const getMockOctokit = () => () => ({
  rest: {
    repos: {
      downloadZipballArchive: () =>
        Promise.resolve({
          url: "https://github.com/zipballs/some-id.zip",
        }),
    },
  },
});

test("#getPostContent retrieves post content from GitHub", async () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  vi.mocked(axios.get).mockReturnValue(getMockRepo());
  // @ts-expect-error: Mock doesn't match real type
  vi.mocked(Octokit).mockImplementation(getMockOctokit());

  const postContent = await getPostContent();

  expect(postContent).toEqual({ "mongo-intro": "# Some Markdown" });
});

test("#verifyWebHook verifies good tokens", () => {
  // Key for the signature "valid"
  process.env.GITHUB_WEBHOOK_TOKEN = "HTRdIMlFw0";

  const isValid = verifyWebHook(githubHookBody, githubSignature);

  expect(isValid).toBe(true);
});

test("#verifyWebHook doesn't verify bad tokens", () => {
  // Key for the signature "valid"
  process.env.GITHUB_WEBHOOK_TOKEN = "HTRdIMlFw0";

  const isValid = verifyWebHook(
    { ...githubHookBody, totallyWrong: "anything that doesn't belong there" },
    githubSignature,
  );

  expect(isValid).toBe(false);
});
