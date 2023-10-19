/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { When, Then } from "vitest-cucumber-plugin";
// import { expect } from "vitest";
// import sinon from "sinon";
//
// import * as postsService from "../../src/services/posts";
// import * as gitHubIntegration from "../../src/services/github";
//
// const populatePostsStub = sinon
//   .stub(postsService, "populatePosts")
//   .returns(Promise.resolve());
//
// sinon
//   .stub(gitHubIntegration, "verifyWebHook")
//   .withArgs(sinon.match.any, "valid")
//   .returns(true)
//   .withArgs(sinon.match.any, "invalid")
//   .returns(false);
//
// When(
//   "I make a POST request to the {string} endpoint with a {string} webhook token",
//   async function (state, [endpoint, validity], table) {
//     const signature = validity;
//     state.response = await state.request
//       .post(endpoint)
//       .set("X-Hub-Signature-256", signature);
//   },
// );
//
// Then("posts are repopulated", function () {
//   expect(populatePostsStub.calledOnce).toBe(true);
// });
//
// Then("I get a {int} response code", function (state, [statusCode], table) {
//   expect(state.response.statusCode).toBe(statusCode);
// });
