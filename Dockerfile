FROM node:20.8.1-alpine3.17 AS base
WORKDIR /app
USER root

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci

COPY . .

FROM base as test
ENV NODE_ENV="test"
CMD ["npm", "run", "_test"]

FROM base as dev
ENV NODE_ENV="dev"
CMD ["npm", "run", "_dev"]

FROM base as production
ENV NODE_ENV="production"
RUN ["npm", "run", "build"]
USER node
ENTRYPOINT ["npm", "start"]
