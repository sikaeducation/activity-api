# Activity Service

RESTful API for interacting with activities. Lives at [https://divine-snow-6176.fly.dev](https://divine-snow-6176.fly.dev).

## Scripts

* `npm test:watch` - Run tests in development
* `npm test:ci` - Run CI tests
* `npm run dev` - Start dev environment (base URL is `localhost://3000`)
* `npm run build` - Force rebuild CI container

## REST Endpoints

* `/activities` - [Documentation](tests/integration/activities.feature)
  * Activity Types - [Documentation](tests/integration/activity-types.feature)
* `/vocab` - [Documentation](tests/integration/vocab.feature)
* `/questions` - [Documentation](tests/integration/question.feature)

## Environment Variables

Copy `.env.example` to `.env` and add GitHub tokens for `GITHUB_TOKEN` and `GITHUB_WEBHOOK_TOKEN`.

## Dependencies

* Docker / Docker Compose

## Stack

* Express
* Mongo
* Cucumber, Expect
* Supertest
