// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  activitiesDataValidator,
  activitiesPatchValidator,
  activitiesQueryValidator,
  activitiesResolver,
  activitiesExternalResolver,
  activitiesDataResolver,
  activitiesPatchResolver,
  activitiesQueryResolver
} from './activities.schema'

import type { Application } from '../../declarations'
import { ActivitiesService, getOptions } from './activities.class'
import { activitiesPath, activitiesMethods } from './activities.shared'

export * from './activities.class'
export * from './activities.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const activities = (app: Application) => {
  // Register our service on the Feathers application
  app.use(activitiesPath, new ActivitiesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: activitiesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(activitiesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(activitiesExternalResolver),
        schemaHooks.resolveResult(activitiesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(activitiesQueryValidator),
        schemaHooks.resolveQuery(activitiesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(activitiesDataValidator),
        schemaHooks.resolveData(activitiesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(activitiesPatchValidator),
        schemaHooks.resolveData(activitiesPatchResolver)
      ],
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
    [activitiesPath]: ActivitiesService
  }
}
