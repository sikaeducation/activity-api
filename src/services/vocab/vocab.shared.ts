// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Vocab, VocabData, VocabPatch, VocabQuery, VocabService } from './vocab.class'

export type { Vocab, VocabData, VocabPatch, VocabQuery }

export type VocabClientService = Pick<VocabService<Params<VocabQuery>>, (typeof vocabMethods)[number]>

export const vocabPath = 'vocab'

export const vocabMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const vocabClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(vocabPath, connection.service(vocabPath), {
    methods: vocabMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [vocabPath]: VocabClientService
  }
}
