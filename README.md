# Activity Service

TODO:

- Not passing TSLint
- Update all the meta docs
- Clean up service files
- Turn tests back on in the FE
- Structure API folder better, for hosting purposes

[![CI](https://github.com/sikaeducation/activity-service/actions/workflows/main.yml/badge.svg)](https://github.com/sikaeducation/activity-service/actions/workflows/main.yml)

RESTful API for interacting with activities. Lives at [https://activity-service.fly.dev](https://activity-service.fly.dev).

## Scripts

- `npm test:watch` - Run tests in development
- `npm test:ci` - Run CI tests
- `npm run dev` - Start dev environment (base URL is `localhost://3000`)
- `npm run build` - Compile TS to `/dist`
- `npm run build:docker` - Force rebuild CI container

## REST Endpoints

- `/activities` - [Documentation](tests/integration/activities.feature)
  - Activity Types - [Documentation](tests/integration/activity-types.feature)
- `/vocab` - [Documentation](tests/integration/vocab.feature)
- `/questions` - [Documentation](tests/integration/question.feature)

## Environment Variables

Copy `.env.example` to `.env` and add:

- `GITHUB_TOKEN` (personal access token for API access)
- `GITHUB_WEBHOOK_TOKEN` (from the `posts` repo)
- `AUTH_KEY_URL` (from the Auth0 jwks URL)
- `DATABASE_URL` (URL to Mongo instance)

## Dependencies

- Docker / Docker Compose
