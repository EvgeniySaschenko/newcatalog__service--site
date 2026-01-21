FROM node:18.13-alpine3.17

ARG WORKDIR_BASE

WORKDIR ${WORKDIR_BASE}

# Установка пакетов
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
