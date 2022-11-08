FROM node:18.7-alpine3.15 as base
WORKDIR /app

COPY package*.json ./
RUN npm install

USER node

FROM base as production

COPY . .
RUN ["npm", "run", "build"]
CMD ["npm", "start"]
