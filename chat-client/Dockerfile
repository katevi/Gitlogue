# Stage 1. Build Angular application
FROM node:8.11.2-alpine as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2. Configure Angular application server.
FROM node:8.11.2-alpine as server
COPY --from=builder /usr/src/app/dist/chat-client server
RUN npm install express@'>=3.0.0 <4.0.0' --save
WORKDIR /
COPY docker/entrypoint.sh entrypoint.sh
RUN sed -i 's/\r\$//' entrypoint.sh && chmod +x entrypoint.sh
EXPOSE 8080 9090
ENTRYPOINT sh ./entrypoint.sh