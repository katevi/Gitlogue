# Stage 1. Build Angular application
FROM node:8.11.2-alpine as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
RUN ls
RUN npm run build
RUN npm install express --save
COPY docker/entrypoint.sh entrypoint.sh
RUN sed -i 's/\r\$//' entrypoint.sh && chmod +x entrypoint.sh
EXPOSE 8081
ENTRYPOINT sh ./entrypoint.sh
