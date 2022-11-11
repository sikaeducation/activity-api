import { without } from "lodash/fp";

export async function insertNewPosts(app: any, allPostNames: string[]) {
  const oldPostNames = await app
    .service("activity")
    .find()
    .toArray()
    .map((activity: { post_slug: string }) => activity.post_slug);

  const newPostNames = without(oldPostNames)(allPostNames) as string[];

  const newPosts = newPostNames.map((name: string) => {
    return {
      _type: "Article",
      title: name.replace("-", " "),
      published: false,
    };
  });

  await app.service("activity").create(newPosts);
}
