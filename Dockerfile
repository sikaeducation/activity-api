FROM node:20.8.1-alpine3.17 AS base
WORKDIR /app
USER root

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci

COPY . .

EXPOSE 8080

FROM base as test
USER root
ENTRYPOINT ["npm", "run", "_test"]

FROM base as dev
USER node
ENTRYPOINT ["npm", "run", "_dev"]

FROM base as production
USER root
RUN ["npm", "run", "build"]
USER node
ENTRYPOINT ["npm", "start"]
