FROM node:20.8.1-alpine3.17 AS base
WORKDIR /app
USER root

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

COPY . .

# To fix npm/Docker/GitHub Actions runner PID bug
RUN mkdir node_modules/.vitest && chmod -R 777 node_modules/.vitest

USER node

CMD ["npm", "run", "dev"]

FROM base as production

RUN npm build

EXPOSE 80

CMD ["npm", "start"]
