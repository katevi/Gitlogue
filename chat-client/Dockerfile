# Stage 1. Build Angular application
FROM node:8.11.2-alpine as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2. Expose built application.
FROM node:8.11.2-alpine as server
COPY --from=builder /usr/src/app/dist/chat server
COPY server/server.js server/server
RUN npm install express --save
COPY docker/entrypoint.sh entrypoint.sh
RUN sed -i 's/\r\$//' entrypoint.sh && chmod +x entrypoint.sh
EXPOSE 8081
ENTRYPOINT sh ./entrypoint.sh
