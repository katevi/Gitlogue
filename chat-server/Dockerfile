FROM gradle:6.3.0-jdk8 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle bootJar

FROM openjdk:8-jre-slim

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs/chat-server-0.0.1-SNAPSHOT.jar /app/chat-server-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-Dspring.data.mongodb.uri=mongodb://database:27017/db", "-jar", "/app/chat-server-0.0.1-SNAPSHOT.jar"]

