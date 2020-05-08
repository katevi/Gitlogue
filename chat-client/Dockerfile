# Stage 1. Build Angular application
FROM node:8.11.2-alpine as builder
WORKDIR /usr/src/app
COPY package.json ./
# -- Install Angular
RUN npm install
COPY . ./
# -- Build Angular application
RUN npm run build

# Stage 2. Expose built application.
FROM node:8.11.2-alpine as server
# -- Move built application from stage 1. This allows ...
# ... us to not keep Angular and the source code within ...
# ... docker image.
COPY --from=builder /usr/src/app/dist/chat server
COPY server/server.js server/
RUN npm install express --save
COPY docker/entrypoint.sh entrypoint.sh
COPY .env .env
RUN sed -i 's/\r\$//' entrypoint.sh && chmod +x entrypoint.sh
EXPOSE 8081
ENTRYPOINT sh ./entrypoint.sh
