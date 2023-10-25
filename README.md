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

Copy `.env.example` to `.env`

## Dependencies

- Docker
- `flyctl`

## Deployment

Increment the version with `npm verision { patch | minor | major }` and push.
