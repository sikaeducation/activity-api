# Activity Service

RESTful API for interacting with activities. Lives at [https://divine-snow-6176.fly.dev](https://divine-snow-6176.fly.dev).

## Scripts

* `npm test:watch` - Run tests in development
* `npm test:ci` - Run CI tests
* `npm run dev` - Start dev environment (base URL is `localhost://3000`)
* `npm run build` - Force rebuild CI container

## REST Endpoints

* `/activities` - [Documentation](tests/activities.feature)
  * Activity Types - [Documentation](tests/activity-types.feature)
* `/vocab` - [Documentation](tests/vocab.feature)
* `/questions` - [Documentation](tests/question.feature)

## Dependencies

* Docker / Docker Compose

## Stack

* Express
* Mongo
* Cucumber, Expect
* Supertest
