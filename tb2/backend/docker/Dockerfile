# =============================================================================
# YaQuedo Backend · Dockerfile multi-stage
# =============================================================================

FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /build
COPY application/pom.xml ./pom.xml
RUN mvn dependency:go-offline -B
COPY application/src ./src
RUN mvn clean package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /build/target/yaquedo-backend.jar app.jar
EXPOSE 8080
ENV JAVA_OPTS=""
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar app.jar"]
