# Activity API

[![CI](https://github.com/sikaeducation/activity-service/actions/workflows/main.yml/badge.svg)](https://github.com/sikaeducation/activity-service/actions/workflows/main.yml)

RESTful API for Sika Education activities. Lives at [https://activity-service.fly.dev](https://activity-service.fly.dev).

## Scripts

- `npm start` - Run pm2 production build
- `npm dev`
- `npm run lint`
- `npm run build`
- `npm run build:docker`
- `npm run test`, `npm run test:watch`

## Documentation

- [Production](https://activity-service.fly.dev/docs)
- `/docs` locally

## Webhook Endpoint

- `POST /regenerate-posts`: Update cache with latest data from [`https://github.com/sikaeducation/posts`](https://github.com/sikaeducation/posts), authenticated with the `WEBHOOK_TOKEN` environment variable. Generate this token from the Posts repo.

## Environment Variables

- For development, copy `.env.example` to `.env`
- For production, ensure that these are set in GitHub:

```yaml
AUTH_KEY_URL: ${{vars.AUTH_KEY_URL}}
DATABASE_URL: ${{secrets.DATABASE_URL}}
REPO_TOKEN: ${{secrets.REPO_TOKEN}}
WEBHOOK_TOKEN: ${{secrets.WEBHOOK_TOKEN}}
```

- `vars.AUTH_KEY_URL`
  SENTRY_URL='https://58b7db5d17119ab93ce142fdd1663ca3@o4506115444637696.ingest.sentry.io/4506115444768768'
  REPO_TOKEN='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'
  WEBHOOK_TOKEN='8fm7fMwZsLPEY8xAACXQ'
  PRODUCTION_DATABASE_URL='mongodb+srv://sika-activity-api:0Q1HwSPWmGud9Bxv@cluster0.cvevubu.mongodb.net/?retryWrites=true&w=majority'

## Dependencies

- Docker
- `flyctl`

## Deployment

Increment the version with `npm verision { patch | minor | major }` and push.
