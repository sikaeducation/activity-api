# Activity API

[![CI](https://github.com/sikaeducation/activity-api/actions/workflows/main.yml/badge.svg)](https://github.com/sikaeducation/activity-api/actions/workflows/main.yml)

RESTful API for Sika Education activities. Lives at [https://activity-api.fly.dev](https://activity-api.fly.dev).

## API Documentation

- [`http://localhost:4000/docs`](http://localhost:4000/docs): Development
- [https://activity-api.fly.dev/docs](https://activity-api.fly.dev/docs): Production

## Webhook Endpoint

- `POST /regenerate-posts`: RPC command to update the posts cache with latest data from the posts repo, authenticated with the `WEBHOOK_TOKEN` environment variable.

## Development

Requires Docker.

```bash
git clone git@github.com:sikaeducation/activity-api.git
cd activity-api
npm install
cp .env.example .env # Fill out values
npm run dev
```

Install [`flyctl`](https://fly.io/docs/hands-on/install-flyctl/) to change deployment configuration.

### Environment Variables

- For development, copy `.env.example` to `.env` and set values (see below for explanation)
- For production, set these in GitHub [secrets](https://github.com/sikaeducation/activity-api/settings/secrets/actions) and [variables](https://github.com/sikaeducation/activity-api/settings/variables/actions):
  - Secrets:
    - `AUTH_KEY_URL`: JWKS well-known URL
    - `DATABASE_URL`: Full connection string
    - `REPO_TOKEN`: To download data from [`https://github.com/sikaeducation/posts`](https://github.com/sikaeducation/posts), generate on the [personal access tokens page](https://github.com/settings/tokens)
    - `WEBHOOK_TOKEN`: Allows the [posts repo](https://github.com/sikaeducation/posts) to make webhook requests to this app, generate on the [Posts webhooks](https://github.com/sikaeducation/posts/settings/hooks) page.
    - `SENTRY_DSN`: Connection URL for Sentry, retrieve on the [Sentry dashboard](https://sika-education.sentry.io/projects/activity-api)
    - `SENTRY_AUTH_TOKEN`: Upload token for source maps on build, generated with the Sentry wizard (`npx @sentry/wizard@latest -i sourcemaps`)
    - `FLY_API_TOKEN`: For deploying to Fly, generate on the [Fly personal access tokens page](https://fly.io/user/personal_access_tokens) page
  - Variables:

Additionally, GitHub actions needs its auto-generated `GITHUB_TOKEN` to have permissions to create releases (`repo` permissions). Set this under [Workflow Permissions](https://github.com/sikaeducation/activity-api/settings/actions).

### Scripts

- `npm start`
- `npm dev`
- `npm run lint`
- `npm run build`
- `npm run build:docker`
- `npm run test`, `npm run test:watch`

## Deployment

- Increment the version with `npm version { patch | minor | major }` and push.
- [App dashboard](https://fly.io/apps/activity-api))
