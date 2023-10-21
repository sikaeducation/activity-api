// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from "@feathersjs/feathers";
import type {
	Vocab,
	VocabData,
	VocabPatch,
	VocabQuery,
	VocabService,
} from "./vocab.class";

export type { Vocab, VocabData, VocabPatch, VocabQuery };

export type VocabClientService = Pick<
	VocabService<Params<VocabQuery>>,
	(typeof vocabMethods)[number]
>;

export const vocabPath = "vocab";

export const vocabMethods = [
	"find",
	"get",
	"create",
	"patch",
	"remove",
] as const;
