import { generateRESTTests } from "$/rest-test-generator";

generateRESTTests({
  serviceName: "vocab",
  items: [
    {
      term: "HTTP",
      definition: "HyperText Transfer Protocol",
    },
    {
      term: "SSH",
      definition: "Secure Shell",
    },
  ],
  collectionName: "vocab",
  tests: ["get", "find", "create", "patch", "remove"],
});
