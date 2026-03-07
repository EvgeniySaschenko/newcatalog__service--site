FROM node:18.13-alpine3.17

ARG APP_DIR

WORKDIR ${APP_DIR}

# Установка пакетов
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
