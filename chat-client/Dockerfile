# Stage 1. Build Angular application
FROM node:8.11.2-alpine as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./* .
RUN npm run build

# Stage 2. Configure Angular application server.
FROM node:8.11.2-alpine as server
# -- Copy built files from first step.
COPY --from=builder /usr/src/app/dist/chat server
# -- Install express library for server.js start up
RUN npm install express --save
WORKDIR /
COPY docker/entrypoint.sh entrypoint.sh
RUN sed -i 's/\r\$//' entrypoint.sh && chmod +x entrypoint.sh
EXPOSE 8081
ENTRYPOINT sh ./entrypoint.sh
