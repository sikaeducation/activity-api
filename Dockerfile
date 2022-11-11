FROM node:18.7-alpine3.15 as base
WORKDIR /app
USER root

ENV DATABASE_URL=$DATABASE_URL
ENV PORT=$PORT
ENV GITHUB_TOKEN=$GITHUB_TOKEN
ENV GITHUB_WEBHOOK_TOKEN=$GITHUB_WEBHOOK_TOKEN

COPY package*.json ./
COPY . .
RUN npm ci

FROM base as production
RUN ["npm", "run", "_build"]
ENV NODE_ENV=production
USER node
ENTRYPOINT ["npm", "start"]
