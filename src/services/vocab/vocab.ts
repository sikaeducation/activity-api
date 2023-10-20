// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  vocabDataValidator,
  vocabPatchValidator,
  vocabQueryValidator,
  vocabResolver,
  vocabExternalResolver,
  vocabDataResolver,
  vocabPatchResolver,
  vocabQueryResolver
} from './vocab.schema'

import type { Application } from '../../declarations'
import { VocabService, getOptions } from './vocab.class'
import { vocabPath, vocabMethods } from './vocab.shared'

export * from './vocab.class'
export * from './vocab.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const vocab = (app: Application) => {
  // Register our service on the Feathers application
  app.use(vocabPath, new VocabService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: vocabMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(vocabPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(vocabExternalResolver),
        schemaHooks.resolveResult(vocabResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(vocabQueryValidator), schemaHooks.resolveQuery(vocabQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(vocabDataValidator), schemaHooks.resolveData(vocabDataResolver)],
      patch: [schemaHooks.validateData(vocabPatchValidator), schemaHooks.resolveData(vocabPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [vocabPath]: VocabService
  }
}
