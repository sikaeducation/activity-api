# Activity Service

TODO:

- Docs
- Turn tests back on in the FE
- Review FE types
- Update all the meta docs

[![CI](https://github.com/sikaeducation/activity-service/actions/workflows/main.yml/badge.svg)](https://github.com/sikaeducation/activity-service/actions/workflows/main.yml)

RESTful API for Sika Education activities. Lives at [https://activity-service.fly.dev](https://activity-service.fly.dev).

## Scripts

- `npm start` - Run production build
- `npm dev` - Run hot reloading development build
- `npm run lint`
- `npm run build`
- `npm run build:docker`
- `npm run test`
- `npm run test:watch`
- `npm run fly:env` - Update production environment variables to match `.fly.env`

## REST Endpoints

- `/activities` - Find, get, remove, find by type
  - `/articles` - Find, get, create, patch, remove
- `/regenerate-posts` - Update cache with latest data from [`https://github.com/sikaeducation/posts`](https://github.com/sikaeducation/posts)
- `/vocab` - Find, get, create, patch, remove

## Environment Variables

Copy `.env.example` to `.env` and `.fly.env`.

## Dependencies

- Docker
- `flyctl`
