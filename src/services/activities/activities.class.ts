// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Activities, ActivitiesData, ActivitiesPatch, ActivitiesQuery } from './activities.schema'

export type { Activities, ActivitiesData, ActivitiesPatch, ActivitiesQuery }

export interface ActivitiesParams extends MongoDBAdapterParams<ActivitiesQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class ActivitiesService<ServiceParams extends Params = ActivitiesParams> extends MongoDBService<
  Activities,
  ActivitiesData,
  ActivitiesParams,
  ActivitiesPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('activities'))
  }
}
