FROM node:18.7-alpine3.15 as base
WORKDIR /app

COPY package*.json ./
RUN npm install

USER node
EXPOSE 27017
