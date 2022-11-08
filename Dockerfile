FROM node:18.7-alpine3.15 as base
WORKDIR /app
USER root

ENV DATABASE_URL=$DATABASE_URL
ENV PORT=$PORT
COPY package*.json ./
COPY . .
RUN npm ci

FROM base as production
RUN ["npm", "run", "_build"]
USER node
ENTRYPOINT ["npm", "start"]
