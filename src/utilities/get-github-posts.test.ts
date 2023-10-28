import { expect, vi, test } from "vitest";
import AdmZip from "adm-zip";
import getGitHubPosts from "@/utilities/get-github-posts";
import axios from "axios";
import { Octokit } from "octokit";

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

  const postContent = await getGitHubPosts();

  expect(postContent).toStrictEqual({ "mongo-intro": "# Some Markdown" });
});
