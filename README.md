# Activity API

[![CI](https://github.com/sikaeducation/activity-service/actions/workflows/main.yml/badge.svg)](https://github.com/sikaeducation/activity-service/actions/workflows/main.yml)

RESTful API for Sika Education activities. Lives at [https://activity-service.fly.dev](https://activity-service.fly.dev).

## API Documentation

- [`http://localhost:4000/docs`](http://localhost:4000/docs): Development
- [https://activity-service.fly.dev/docs](https://activity-service.fly.dev/docs): Production

## Webhook Endpoint

- `POST /regenerate-posts`: RPC command to update the posts cache with latest data from the posts repo, authenticated with the `WEBHOOK_TOKEN` environment variable.

## Development

Requires Docker.

```bash
git clone git@github.com:sikaeducation/activity-service.git
cd activity-service
npm install
cp .env.example .env # Fill out values
npm run dev
```

Install [`flyctl`](https://fly.io/docs/hands-on/install-flyctl/) to change deployment configuration.

### Environment Variables

- For development, copy `.env.example` to `.env` and set values
- For production, set these in GitHub [secrets](https://github.com/sikaeducation/activity-service/settings/secrets/actions) and [variables](https://github.com/sikaeducation/activity-service/settings/variables/actions):
  - Secrets:
    - `DATABASE_URL`: Full connection string
    - `FLY_API_TOKEN`: For deploying to Fly, generate on the [Fly personal access tokens page](https://fly.io/user/personal_access_tokens) page
    - `REPO_TOKEN`: To download data from [`https://github.com/sikaeducation/posts`](https://github.com/sikaeducation/posts), generate on the [personal access tokens page](https://github.com/settings/tokens)
    - `SENTRY_TOKEN`
    - `SENTRY_URL`
    - `WEBHOOK_TOKEN`: Allows the [posts repo](https://github.com/sikaeducation/posts) to make webhook requests to this app, generate on the [Posts webhooks](https://github.com/sikaeducation/posts/settings/hooks) page.
  - Variables:
    - `AUTH_KEY_URL`: JWKS well-known URL

### Scripts

- `npm start`
- `npm dev`
- `npm run lint`
- `npm run build`
- `npm run build:docker`
- `npm run test`, `npm run test:watch`

## Deployment

- Increment the version with `npm version { patch | minor | major }` and push.
- [App dashboard](https://fly.io/apps/activity-service))
