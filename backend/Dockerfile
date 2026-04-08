# syntax=docker/dockerfile:1.7

FROM --platform=$BUILDPLATFORM gradle:8.14.0-jdk21 AS build
WORKDIR /app

COPY gradle gradle
COPY gradlew settings.gradle build.gradle ./
RUN chmod +x gradlew

COPY src src

# 테스트는 CI에서 별도 수행 권장
RUN ./gradlew clean bootJar -x test --no-daemon \
 && cp "$(ls build/libs/*SNAPSHOT.jar | grep -v plain | head -n 1)" /app/app.jar

FROM --platform=$TARGETPLATFORM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/app.jar /app/app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
