FROM node:20.8.1-alpine3.17 AS base
WORKDIR /app
USER root

COPY . .

RUN npm ci

USER node

CMD ["npm", "run", "dev"]
