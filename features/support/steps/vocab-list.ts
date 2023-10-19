/* eslint-disable @typescript-eslint/no-explicit-any */
import { When, Then, DataTable } from "@cucumber/cucumber";
import expect from "expect";
import { Response } from "express";
import { ObjectId } from "mongodb";
import { WorldEnvironment } from "../world";

type Vocab = { term: string; definition: string };
type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
const httpMethods = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
} as const;

When(
  "I make a {string} request to the {string} endpoint with a vocab list:",
  async function (
    this: WorldEnvironment,
    method: HTTPMethod,
    endpoint: string,
    table: DataTable,
  ) {
    const normalizedMethod = httpMethods[method];
    const data = table.hashes()[0] as { entries: string | Vocab[] };

    if (typeof data.entries === "string") {
      data.entries = data.entries
        .split(", ")
        .reduce((list: Vocab[], entry: string) => {
          const [term, definition] = entry.split(": ");
          return [...list, { term, definition }];
        }, []);
    }

    this.request = await this.request[normalizedMethod](endpoint)
      .send(data)
      .expect((response: Response) => {
        if (response.status >= 400)
          throw new Error(JSON.stringify(response.body));
      });
  },
);

Then(
  "this vocab list is saved in {string}:",
  async function (collection, table: DataTable) {
    const data = table.hashes()[0] as {
      _id?: typeof ObjectId;
      entries: string | Vocab[];
    };
    data._id = data._id
      ? new ObjectId(data._id as unknown as string)
      : undefined;
    data.entries = data.entries.split(", ").reduce((list: any, entry: any) => {
      const [term, definition] = entry.split(": ");
      return [...list, { term, definition }];
    }, []);

    const record = await this.database
      .collection(collection)
      .findOne({ _id: data._id });

    expect(record).toMatchObject(data);
  },
);
