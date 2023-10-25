FROM node:20.8.1-alpine3.17 AS base
WORKDIR /app
USER root

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

COPY . .

USER node

CMD ["npm", "run", "dev"]

FROM base as production

RUN npm build

EXPOSE 80

CMD ["npm", "start"]
